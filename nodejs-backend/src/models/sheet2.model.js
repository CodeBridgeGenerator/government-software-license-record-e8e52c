
    module.exports = function (app) {
        const modelName = 'sheet2';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            ethnicity: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
population: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
percentage: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },

            
            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true }
          },
          {
            timestamps: true
        });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };