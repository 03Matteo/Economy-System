## Economy-System

A package that simplifies the creation of an economy system.

# Installation

```@03matteo/economy-system```

Then ...

```
const { earn: { Work, Slut, Rob, Crime } } = require('03@matteo/economy-system');

/*!! Improtant:
-provide minLose and maxLose as positives, don't worry the output will be negative;
-zeroChance is the probability to recive 0 instead of a number between minWin and maxWin;
-chance is the probability to win or lose money;
-the only default values are zeroChance and randomSentences, be sure to insert any other property;
-randomSentences rapresent if you want to recive back with the output a random sentence setted by yourself (how to do that? Read all!!);
-there are a lot of security checks but for avoid any problem be sure to insert these properties as integer or float numbers (float numbers will only take effect in chances), the last one fore sure is a boolean value;*/

const crime = new Crime({
    minWin: 100,
    maxWin: 500,
    minLose: 200,
    maxLose: 700,
    chance: 50, // 50 = 50%
    zeroChance: 20, // 20 = 20%, default = 0%
    randomSentences: true //default = false
});

/*How to set a sentence?
-first, declare an instance of an earn class like this one;
-after, for each sentence you want to insert in the list do:
crime.addSentence(type, sentence)
     .addSentence(type, sentence)
     .addSentence(type, sentence); and so on...

type = the type of sentence related to the output:
if type is equals to 'win', the sentence will be added in the list of sentences associated to the win case;

is similar for 'zero' and 'lose' types;

to do that in a more efficient way you could use a for loop;*/

/*How to receve the output?
Easy!
write:*/

const output = crime.getValues();

/*You will recive an object as output similar to this:
{ value: (a number), sentence: (a sentence) }
value: will be a calculation of the probability given and will be a number between minWin and maxWin, minLose and maxLose, or 0;

sentence: will be a sentence if your randomSentences is true and you already inserted al least one, if not you'll recive undefined, if your randomSentences is false the output will contain only the value; 
*/
```