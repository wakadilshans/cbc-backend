import Student from "../models/student.js";  //import student model

export function getStudents(req, res) {              //need to re create these router crud tasks as the separate contoller functions. that is bussiness logic
    Student.find().then((studentList) => {

        res.json({
            message: studentList
        })

    })
}

//exprt function as the normal functions bcz default export can handle one java dile at one export only
export function createStudent(req, res) {
    const student = new Student(req.body)
    student.save().then(() => {
        res.json({
            message: "student created"
        })
    }).catch(() => {
        res.json({
            message: "student is not created"
        })
    })


}

//rq eke body eke ena name eka aithi kena dekete kenna
export function deleteStudent(req, res) {
    Student.deleteOne({ name: req.body.name }).then(() => {
        res.json({
            message: "student deleted successfully"
        })
    }
    )
}



