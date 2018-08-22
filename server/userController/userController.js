module.exports = {
    ignoreAuthInDevelopment: (req, res, next) => {
        if(process.env.MODE === 'development' && !req.session.user){
            req.session.user = {
                id:1, 
                auth_id:'google-oauth2|102948968802324753832', 
                user_name: 'Stephen Pace',	
                user_pic: 'https://lh5.googleusercontent.com/-sapgzN9K2rg/AAAAAAAAAAI/AAAAAAAAAwg/RLOCqjo6wDU/photo.jpg',
            };
            next();
        } else {
            next();
        }
    },

    read: ( req, res ) => {
        let { authID } = req.session.user
        req.app.get('db').get_user_info([ authID ])
        .then( response => {
            req.session.user = response[0]
            res.sendStatus(200)
        })
        .catch(console.log)
    },
    
    update: (req, res) => {
        const {id} = req.params;
        const {lat, long} = req.body;
        req.app.get('db').update_user_latlong([id, lat, long])
        .then( response => {
            res.status(200)
        })
    },

    getUserSession: (req, res) => {
        res.status(200).send(req.session);
        console.log(req.session)
    },

    getUserData: (req, res) => {
        const {userid} = req.params;
        req.app.get('db').get_user_data([userid])
        .then(data => {
            res.send(data)
        })
    },

    changeUserData: (req, res) => {
        const {userid} = req.params;
        const {fullName, bio, email, phone} = req.body;
        req.app.get('db').change_user_data([fullName, bio, email, phone, userid])
        .then(() => {
            res.end()
        })
    }

}