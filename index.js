const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');

const app = express();
const port = 8000;


try {
    const swaggerDocument = YAML.load(path.join(__dirname, '/api.yaml'));
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  } catch (error) {
    console.error('Error loading YAML file:', error);
  }

app.use(bodyParser.raw({ type: '*/*' }));

var {getObject,putObject,deleteObject,listObject,listBucket}= require('./controller')

app.get('/getobject/objects', getObject);

app.post('/putobject/objects',putObject);

app.delete('/deleteobject/objects', deleteObject);

app.get('/listobject/objects', listObject);

  app.get('/listbuckets', listBucket);

app.listen(port, () => {
    console.log(`Express S3 service listening at http://localhost:${port}`);
  });