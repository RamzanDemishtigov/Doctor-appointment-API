const express = require("express")
const router = express.Router()
const Doctors = require("./models/Doctors.js")
const Users = require("./models/Users.js")
const notifCheck = require("./middleware/notifications.js")

router.get("/notifications/:userId",async (req,res) => {
	const user = await Users.findOne({_id:req.params.userId})
	let doctors = await Doctors.find()
	notifCheck(user,doctors)
	res.send()
})
//router.use("/users/:id",notifCheck())

router.get("/users/:id", async (req, res) => {
	const user = await Users.findOne({ _id: req.params.id })
	res.send(user)
})

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
	await doctor.save()
	res.send(doctor)
})

router.patch("/doctors/:id", async (req, res) => {
	const doctor = await Doctors.findOne({ _id: req.params.id })
    const time = req.body.time
	let response;
    for(let i=0;i<doctor.slots.length;i++){
        if(doctor.slots[i].time == time && doctor.slots[i].condition == false){
            doctor.slots[i].condition = true;
            doctor.slots[i].user = req.body.user;
            await doctor.save()
	        response = doctor
        }else if(doctor.slots[i].time == time && doctor.slots[i].condition == true){
            response = "Данное время уже занято"
        }
    }
	if(response != doctor && response != "Данное время уже занято"){
		response = "Ошибка: Такого времени не существует"
	}
	res.send(response)
})

module.exports = router