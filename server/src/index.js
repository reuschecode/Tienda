import app from './app'
import './database'

//desplegación de servidor
app.listen(app.get('port'), () => {
    console.log("corriendo aplicación en el puerto "+app.get('port'))
});