import Product from "../models/product.js";

export function getProduct(req, res) {
    Product.find().then(
        (productlist) => {
            res.json({
                list: productlist
            })
        }
    ).catch((err) => {
        res.json({
            message: "error"
        })
    })
}


export function createProduct(req, res) {

    //user authentication
    console.log(req.user) //req eke inna user print krnna, jwt token dekn decod krpu user detials req.iser hara gnna puluwan, req.user = decoded mekn thma req.user ta decoded data send krnne . index,js idla

    if (req.user == null) {
        res.json({                             //user authentication
            message: "you are not log in"
        })
        return //must need return, other wise not stop the exceution of the  functions
        //netm function eke ithuru tika exexute wenwa return kle nettm
    }

    if (req.user.type != "admin") {
        res.json({
            message: "you are not an admin"   //user authaaization
        })
        return
    }

    const product = new Product(req.body)
    product.save().then(() => {
        res.json({
            message: "product created"
        })
    }
    ).catch((err) => {
        res.json({
            message: "product not created"
        })
    })
}



export function deleteProdcut(req, res) {
    Product.deleteOne({ name: req.params.name }).then(() => {
        res.json({
            message: "product deleted successfully"
        })
    }).catch((err) => {
        res.json({
            message: "proudct not deleted"
        })
    }
    )

}



export function getProductByName(req, res) {
    const name = req.params.name;  //rq eka body ekt convet krnwa
    Product.find({ name: name }).then(  //rq ena name eken product eke details gnnawa
        (productList) => {
            if (productList.length == 0) {
                res.json({
                    message: "prodcut not found"
                })
            } else {
                res.json({
                    list: productList
                })
            }
        }
    ).catch(() => {
        res.json({
            message: "error"
        })
    })
}