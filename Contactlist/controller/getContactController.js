let Contact = require('../model/contactModel')

let Alldata = () => {
    return Contact.find()
}

let errorHangle = (data) => {

    let Errors = {
        name: "",
        email: "",
        phone: ""
    }

    if (!data.name) {
        Errors.name = "Name is Required"
    } else if (typeof data.name !== 'string') {
        Errors.name = "Name Must be a String"
    } else {
        Errors.name = ""
    }

    if (!data.email) {
        Errors.email = "Email is Required"
    } else if (!data.email.split('').includes("@")) {
        Errors.email = 'Email Must Contain @ '
    } else {
        Errors.email = ''
    }

    if (!data.phone) {
        Errors.phone = "Phone is Required"
    }

    return Errors;
}


module.exports.getContactControllers = async (req, res) => {

    try {
        let AllContact = await Alldata()

        console.log(AllContact)
        res.render('index', {
            Contacts: AllContact,
            Errors: {
                name: "",
                email: "",
                phone: ""
            }
        })
    } catch (err) {
        res.json(err)
    }
}

module.exports.addContactController = async (req, res) => {
    const {
        name,
        email,
        phone
    } = req.body;
    let id = req.body._id
    let Errors = errorHangle(req.body)
    let isError = Object.values(Errors).some(msg => msg !== "");

    if (isError) {
        try {
            let AllContact = await Alldata()
            return res.render('index', {
                Contacts: AllContact,
                Errors
            })
        } catch (err) {
            res.json(err)
        }

    } else {
        if (id) {
            try {
                let updateContact = await Contact.findByIdAndUpdate(id, {
                    name,
                    email,
                    phone
                }, {
                    new: true
                })
                let AllContact = await Alldata()
                res.render('index', {
                    Contacts: AllContact,
                    Errors
                })
                console.log("Contact is Updated", updateContact)
            } catch (err) {
                res.json(err)
            }

        } else {
            try {
                let newContact = new Contact({
                    name,
                    email,
                    phone
                })

                await newContact.save()
                let AllContact = await Alldata()
                console.log("New user Created Successfully", newContact)
                res.render('index', {
                    Contacts: AllContact,
                    Errors
                })
            } catch (err) {
                res.json(err)
            }
        }
    }
}


module.exports.deleteContactController = async (req, res) => {
    let id = req.params.id
    try {
        let deleteContact = await Contact.findByIdAndDelete(id)
        let AllContact = await Alldata()
        console.log(AllContact)
        res.render('index', {
            Contacts: AllContact,
            Errors: {
                name: "",
                email: "",
                phone: ""
            }
        })
    } catch (err) {
        res.json(err)
    }


}

