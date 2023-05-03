const express = require("express")
const Doctors = require("./models/Doctors.js")
const Users = require("./models/Users.js")
const router = express.Router()

// Get all posts
router.get("/users", async (req, res) => {
	const users = await Users.find()
	res.send(users)
})

router.post("/users", async (req, res) => {
	const user = new Users({
		phone: req.body.phone,
		name: req.body.name,
	})
	await user.save()
	res.send(user)
})

router.get("/doctors", async (req, res) => {
	const doctors = await Doctors.find()
	res.send(doctors)
})

router.post("/doctors", async (req, res) => {
	const doctor = new Doctors({
		name: req.body.name,
        spec: req.body.spec,
        slots: [...req.body.slots]
	})
	await user.save()
	res.send(user)
})

router.patch("/doctors/:id", async (req, res) => {
	try {
		const doctor = await Doctors.findOne({ _id: req.params.id })
        const time = req.body.time
        for(let i=0;i<doctor.slots.length();i++){
            if(doctor.slots[i].time == time && doctor.slots[i].condition == false){
                doctor.slots[i].condition = true;
                doctor.slots[i].user = req.body.user;

                await post.save()
		        res.send(post)
            }else if(doctor.slots[i].condition == true){
                res.send("Данное время уже занято")
            }else{
                res.status(404).send("Ошибка: Такого времени не существует")
            }
        }
	} catch {
		res.status(404)
		res.send({ error: "Doctor doesn't exist!" })
	}
})

module.exports = router