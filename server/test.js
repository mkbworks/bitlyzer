import BusinessAccessLayer from "./bal/bal.js";

async function testDatabase()
{
    let bal = await BusinessAccessLayer.GetBal();
    let email = "maheshkumaar.balaji@outlook.com";
    let apiKey = bal.GenerateApiKey();
    await bal.ValidateUser(email, apiKey);
}

testDatabase().then(() => {
    console.log("testDatabase() execution has completed successfully.");
}).catch(err => {
    console.error(`Error occurred: ${err}`);
});