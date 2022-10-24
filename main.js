// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};
//returns an object that contains specimenNum and dna
const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum: specimenNum,
    dna: dna,
    //find a random base, then change that base to another random base not equal to the original
    mutate() {
      let newDna = [];
      const randBase = returnRandBase();
      for (let i = 0; i < this.dna.length; i++) {
        if (randBase == this.dna[i]) {
          do {
            this.dna[i] = returnRandBase();
          } while (randBase == this.dna[i]);
        }
        newDna.push(dna[i]);
      }
      console.log(newDna);
    },
    //compare two dna strands for percent similar
    compareDNA(pAequor) {
      let similar = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (pAequor.dna[i] == this.dna[i]) {
          similar += 1;
        }
      }
      let percentCommon = (similar / this.dna.length) * 100;
      let percentCommonRounded = percentCommon.toFixed(2);
      console.log(
        "Specimen " +
          specimenNum +
          " and Specimen " +
          pAequor.specimenNum +
          " have " +
          percentCommonRounded +
          "% DNA in common."
      );
    },
    //return true if 60%+ of array contains C or G bases
    willLikelySurvive() {
      let cOrG = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === "C" || this.dna[i] === "G") {
          cOrG += 1;
        }
      }
      let survive = (cOrG / this.dna.length) * 100;
      //check percentage
      //console.log(survive.toFixed(2));
      if (survive < 60) {
        //console.log("dna will NOT survive");
        return false;
      } else {
        //console.log("dna WILL likely survive");
        return true;
      }
    },
    complementStrand() {
      let complementDNA = [];
      for (let i = 0; i < dna.length; i++) {
        if (this.dna[i] == "A") {
          complementDNA.push("T");
        } else if (this.dna[i] == "T") {
          complementDNA.push("A");
        } else if (this.dna[i] == "C") {
          complementDNA.push("G");
        } else if (this.dna[i] == "G") {
          complementDNA.push("C");
        }
      }
      console.log(complementDNA);
    },
  };
};

//test pAequorFactory
const test = pAequorFactory(555, mockUpStrand());
console.log(test);
const test2 = pAequorFactory(777, mockUpStrand());
console.log(test2);
//test.mutate();
test.compareDNA(test2);
//test.willLikelySurvive();
test.complementStrand();

//create 30 instances of pAequor that are likely to survive in a new array
const surviveArray = [];
let specimenCounter = 1;

while (surviveArray.length < 30) {
  let obj = pAequorFactory(specimenCounter, mockUpStrand());
  if (obj.willLikelySurvive() == true) {
    surviveArray.push(obj.specimenNum, obj.dna);
  }
  specimenCounter += 1;
}
console.log(surviveArray);

