const { version } = require('../../package.json');

module.exports = async () => {
    for (let i = 0; i < 3; i++) {
        await console.log('');
    }

    await console.log('============================================================================');

    await console.log(`Economy-System (${version})\n`);
    await console.log(`| 1 | First you need to decide if you want to save all income and loses in the database (mongoose).
a. In the case you want it, at the top of your main file you need to add:
   -
   const { Initialize } = require('@03matteo/economy-system');
   Initialize('Your MongoDB_URL here', true);
   //If you add true there will be a console log of successful connection
   -
   The document in the database will be similar to this:
   {
       _ID: 'all',
       userId: String,
       lastUpdated: Date,
       bag: {
           amount: Number,
           maxSize: Number
       },
       allCmds: {
           earn: Number
       }
   }
b. In the case you don't want it, you don't need to add anything in the main file, just follow other steps.

| 2 | To create a new instance of an earn command open the file that you like more and type at the top:
   -
   const { Earn } = require('@03matteo/economy-system');
   const instance = new Earn({});
   -
   There are a bunch of options to set: userId, minWin, maxWin, minLose, maxLose, chance, zeroChance.
   -userId: A string that will be useful to identify the user in the database if you are using it, otherwise insert a random string;
   -minWin: The minimum amount of money that the user will win;
   -maxWin: The maximum amount of money that the user will win;
   -minLose: The minimum amount of money that the user will lose;
   -maxLose: The maximum amount of money that the user will lose;
   -chance: The chance that the user will win or lose money, by default is 100(%), it means that the user will always win;
   -zeroChance: The chance to recive 0 money, by default is 0(%), it means that the user will never recive 0 money;
   Example:
   -
   const instance = new Earn({
        userId: '5s3g6e2f1j4w2o4t2m',
        minWin: 100, 
        maxWin: 200, 
        minLose: 50,
        maxLose: 500,
        chance: 40, //40% of chance to win money (so 60% of chance to lose money)
        zeroChance: 5 //5% of chance to recive 0 money
   });
   -
   To get the data of the instance add:
   -
   const data = await instance.getData(); //be sure to be inside an asyncronous function
   -
   To save all the data in the database add:
   -
    (await) instance.save(schema, true); 
    //be sure to change 'schema' with a mongoose model similar to this (@03matteo/economy-system/src/schemas/profile-schema.js)
    //If you add true there will be a console log of confirm
   -
   Be careful to call getData() before save().
   All the data you need to know are in the data object, so to get access to it you could add:
   -
   const { value, bagEccess, currentBagAmount, maxSize, cmdExecuted } = data;
   //In case you are not using the database you will recive as a valid output only 'value'.
   -

That's it!
Enjoy makeing awesome minigames with this package. Thank you for using it.
If you find any bug please report it on the GitHub Issues page. (https://github.com/03Matteo/Economy-System/issues)`);

    await console.log('============================================================================');
}