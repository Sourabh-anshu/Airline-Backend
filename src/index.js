const express = require('express');

const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use('/api', apiRoutes);



app.listen(ServerConfig.PORT, async ()=>{
    console.log(`Successfully started the server at PORT: ${ServerConfig.PORT}`);

    const { City, Airport} = require('./models');
    const mumbai = await City.findByPk(6);
    // console.log(mumbai);
    // const mumAirport = await Airport.create({name: 'Chhatrapati SivaJi Airport', code: 'MUM', cityId : 6});
    // console.log(mumAirport);
    // const newMumAirport = await Airport.create({name:'Navi Mumbai Airport', code : 'NVM', cityId:6});
    // console.log(newMumAirport);
    // await mumbai.createAirport({name:'Juhu Airport', code:'JHU'});
    await City.destroy({
        where: {
            id : 6
        }
    })
})