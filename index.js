var express = require('express')
var axios = require('axios')
const path = require('path')
var app = express()

app.set('view engine', 'ejs')
app.set('views', './pages/')
app.use(express.static("public"));

app.get('/', async function(req, res) {
    var meal_button = req.query.meal_button
    var show = false
    console.log('Button:',meal_button)
    if (!meal_button == undefined || !meal_button == '') {
        show = true
        console.log('show:',show)
        var meal = await axios.get('https://www.themealdb.com/api/json/v1/1/random.php').then(response => { return response.data.meals[0] })
        var ingredients = []
        for (let index = 1; index < 20; index++) {
        
            if(meal[`strIngredient${index}`]){
                ingredients.push(`${meal[`strIngredient${index}`]} - ${meal[`strMeasure${index}`]}`)
            }
            else{
                break
            }
        }
    }
    res.render('index', {'meal':meal, 'ingredients':ingredients, 'show':show })
})

var server = app.listen(5000, function() {
    console.log('Servidor de desenvolvimento rodando na porta 5000')
})