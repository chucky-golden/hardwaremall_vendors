const Vendors = require('../models/vendors')
const passwordHash = require('../middlewares/passwordencrypt')
const { onlyMailExist } = require('../middlewares/details')
const cloudinary = require('../middlewares/cloudinary')
const streamifier = require('streamifier')
const { sendmail, mailGenerator } = require('../middlewares/mailer')


// vendors register
const vendorsregister = async (req, res) => {
    try{
        
        email = req.body.email;  


        var details = await onlyMailExist(email);
        
        if(details === false){

            // Convert the buffer to a readable stream
            const bufferStream = streamifier.createReadStream(req.file.buffer);
            // Create a stream from the buffer
            const stream = cloudinary.uploader.upload_stream(async (error, result) => {
                if (error) {
                    console.error(error);
                    return res.json({ message: 'Error uploading product' });
                } else {

                    let slug = Math.floor(Math.random() * Date.now()).toString(16)
                    slug = slug + '-' + req.body.name

                    password = await passwordHash(req.body.password)

                    let info = {
                        email: email,
                        password: password,
                        title: req.body.title,
                        contact: req.body.contact,
                        location: req.body.location,
                        website: req.body.website,
                        description: req.body.description,
                        whatsapp: req.body.whatsapp,
                        photo: result.secure_url,
                        balance: '0',
                        block: '1',
                        cloudinaryid: result.public_id,
                        callLeads: '0',
                        phoneLeads: '0',
                        slug: slug,
                    }

                    const vendors = await new Vendors(info).save()
                    if(vendors !== null){
                        req.session.vendors = vendors
                        res.json({ message: 'store account created', data: vendors })
                    }else{
                        res.json({ message: 'error creating account' })
                    }
                }
            });

            // Pipe the buffer stream to the Cloudinary stream
            bufferStream.pipe(stream);
        }else{
            res.json({message: "vendor account with email address already exists"});
        }

    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}


// vendors login
const vendorslogin = async (req, res) => {
    try{
        email = req.body.email;
        password = await passwordHash(req.body.password)

        const vendors = await Vendors.findOne({ email: req.body.email }); 
        if (vendors) { 
            //check if password matches 
            const result = password === vendors.password; 
          if (result) {
                if(vendors.block == '1'){
                    req.session.vendors = vendors 
                    res.json({ message: 'login successful', data: vendors }) 
                }else{
                    res.json({ message: 'account suspended' }) 
                }
          } else { 
                res.status(400).json({ error: "password doesn't match" }); 
          } 
        } else { 
            res.status(400).json({ error: "User doesn't exist" }); 
        } 

    }catch (error) {
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}



// vendors forgot password
const vendorsForgot = async (req, res) => {
    try{
        email = req.body.email;  

        var details = await onlyMailExist(email);
        
        if(details === true){  

            var emailSender = {
                body: {
                    name: 'Hardware Mall',
                    intro: 'We got a request to reset your  password, if this was you, click the link below to reset password or ignore and nothing will happen to your account.',

                    action: {
                        instructions: 'To get started, please click here:',
                        button: {
                            color: '#22BC66',
                            text: 'Recover Password',
                            link: 'https://www.hardwaremall.com/passwordreset?email='+email
                        }
                    },
                    
                    outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.\n\n Team Hardware Mall.'
                }
            };
            
            // Generate an HTML email with the provided contents
            let emailBody = mailGenerator.generate(emailSender);
            // send mail
            const sent = sendmail(email, 'Password Recovery', emailBody);
            if(sent == true){
                res.status(200).json({ message: 'check your mail', data:email })
            }else{
                res.status(200).json({ message: 'error sending mail' })
            }

        }else{
            res.json({ message: 'email address does not exist' })
        }
    }catch(error){
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}



// vendors rest password
const vendorsReset = async (req, res) => {
    try{
        
        email = req.body.email;
        password = passwordHash(req.body.password);

        const vendor = await Vendors.update({ password:password }, { where: {email: email }})

        if(vendor !== null){
            res.json({ message: "password changed", data: email })
        }else{
            res.json({ message: "error reseting password", data: email }) 
        }

    }catch(error){
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}


const fetchVendor = async (req, res) => {
    try{

        let id = req.params.id
        const vendor = await Vendors.findOne({ _id: id });

        if(vendor !== null){
            res.json({ message: vendor })
        }else{
            res.json({ message: 'no vendor found' })
        }

    }catch(error){
        console.log(error)
        res.json({ message: 'error processing request' })
    }
}


module.exports = {
    vendorslogin,
    vendorsregister,
    vendorsForgot,
    vendorsReset,
    fetchVendor,
}