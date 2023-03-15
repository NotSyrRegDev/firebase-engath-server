const functions = require("firebase-functions");

const admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const express = require("express");
const cors = require("cors");
const { response } = require("express");
const app = express();

app.use(cors({ origin: true }));
const db = admin.firestore();




// read all PARAMEDICS details
// get
app.get("/api/paramedics", (req, res) => {
  (async () => {
    try {
      let query = db.collection("paramedics");
      let response = [];

      await query.get().then((data) => {
        let docs = data.docs; // query results

        docs.map((doc) => {
          const selectedData = {
            email: doc.data().email,
            is_admin: doc.data().is_admin,
            name: doc.data().name,
            role: doc.data().role,
            team_id: doc.data().team_id,
          };

          response.push(selectedData);
        });
        return response;
      });

      return res.status(200).send({ status: "Success", type : 'paramedics' ,  data: response });
    } catch (error) {
      console.log(error);
      res.status(500).send({ status: "Failed", msg: error });
    }
  })();
});

// read all TEAMS details
// get
app.get("/api/teams", (req, res) => {
  (async () => {
    try {
      let query = db.collection("teams");
      let response = [];

      await query.get().then((data) => {
        let docs = data.docs; // query results

        docs.map((doc) => {
          const selectedData = {
            team_id: doc.data().team_id,
            team_leader: doc.data().team_leader,
            team_number: doc.data().team_number,
            
          };

          response.push(selectedData);
        });
        return response;
      });

      return res.status(200).send({ status: "Success",  type : 'teams' , data: response });
    } catch (error) {
      console.log(error);
      res.status(500).send({ status: "Failed", msg: error });
    }
  })();
});

// read all CASES details
// get
app.get("/api/cases", (req, res) => {
  (async () => {
    try {
      let query = db.collection("cases");
      let response = [];

      await query.get().then((data) => {
        let docs = data.docs; // query results

        docs.map((doc) => {
          const selectedData = {
            caseItem: doc.data().caseItem,     
          };

          response.push(selectedData);
        });
        return response;
      });

      return res.status(200).send({ status: "Success", type : 'cases' ,  data: response });
    } catch (error) {
      console.log(error);
      res.status(500).send({ status: "Failed", msg: error });
    }
  })();
});



// Exports api to the firebase cloud functions
exports.app = functions.https.onRequest(app);
