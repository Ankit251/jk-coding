const fs = require('fs-extra');
async function getObject(req,res){
    const { bucketName, key } = req.query;
    try {
    
      const data = (await fs.readFile(`./${bucketName}/${key}`)).toString();
      res.status(200).send(data);
    } catch (error) {
      res.status(404).send('Object not found',error);
    }
}

async function putObject(req,res){
     
        const { bucketName, key } = req.query;
        const data = req.body;
        try {
          await fs.writeFile(`./${bucketName}/${key}`, data);
          res.send('Object saved successfully');
        } catch (error) {
          res.status(500).send('Error saving object',error);
        }
      
}

async function deleteObject(req,res){
    const { bucketName, key } = req.query;
    try {
      await fs.unlink(`./${bucketName}/${key}`);
      res.send('Object deleted successfully');
    } catch (error) {
      res.status(404).send('Object not found');
    }
}

async function listObject(req,res){
    const { bucketName } = req.query;
    try {
      const files = await fs.readdir(`./${bucketName}`);
      res.send(files);
    } catch (error) {
      res.status(404).send('Bucket not found');
    }
}

async function listBucket(req,res){
    try {
        const buckets = await fs.readdir('./');
        const bucketDirs = buckets.filter(bucket => fs.lstatSync(bucket).isDirectory());
        res.send(bucketDirs);
      } catch (error) {
        res.status(500).send('Error listing buckets');
      }
}

module.exports = {getObject,putObject,deleteObject,listObject,listBucket};