module.exports = (fields) => (data) => {
    Object.entries(fields)
        .forEach(([key, validation]) => {
            if(validation == "required"){
                if(!data.dataValues[key])
                    throw new Error(`Campo ${key} é obrigatório`);
            }
        })
}