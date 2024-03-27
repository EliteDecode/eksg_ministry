export var transactions = [];

function randomDateAsString(start, end) {
  var randomDate = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  var day = randomDate.getDate();
  var month = randomDate.toLocaleString("default", { month: "short" });
  var year = randomDate.getFullYear();
  var suffix =
    day % 10 == 1 && day != 11
      ? "st"
      : day % 10 == 2 && day != 12
      ? "nd"
      : day % 10 == 3 && day != 13
      ? "rd"
      : "th";
  return day + suffix + " " + month + " " + year;
}

var ekitiSchools = [
  "Ekiti State University",
  "Federal University Oye-Ekiti",
  "College of Education, Ikere-Ekiti",
  "Federal Polytechnic Ado-Ekiti",
  "Afe Babalola University, Ado-Ekiti",
];
var paymentModes = [
  "Credit Card",
  "Debit Card",
  "Bank Transfer",
  "Mobile Money",
];
var transactionStatuses = ["Successful", "Pending", "Failed"];

for (var i = 0; i < 40; i++) {
  var transaction = {
    TransactionId: Math.floor(Math.random() * 100000),
    name: ekitiSchools[Math.floor(Math.random() * ekitiSchools.length)],
    paymentMode: paymentModes[Math.floor(Math.random() * paymentModes.length)],
    dateCreated: randomDateAsString(new Date(2023, 0, 1), new Date()),
    validTill: randomDateAsString(new Date(), new Date(2025, 11, 31)),
    amount: Math.floor(Math.random() * 1000) + 1,
    status:
      transactionStatuses[
        Math.floor(Math.random() * transactionStatuses.length)
      ],
  };
  transactions.push(transaction);
}

export var SingleSchoolTransactions = [];

function randomDateAsString2(start, end) {
  var randomDate = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  var day = randomDate.getDate();
  var month = randomDate.toLocaleString("default", { month: "short" });
  var year = randomDate.getFullYear();
  var suffix =
    day % 10 == 1 && day != 11
      ? "st"
      : day % 10 == 2 && day != 12
      ? "nd"
      : day % 10 == 3 && day != 13
      ? "rd"
      : "th";
  return day + suffix + " " + month + " " + year;
}

var classes = ["Class A", "Class B", "Class C", "Class D"];

var studentNames = [
  "Tolu Adeyemi",
  "Femi Adebayo",
  "Bola Ogunlade",
  "Yemi Adeoti",
  "Segun Akin",
  "Lola Ojo",
  "Funmi Oladele",
  "Kunle Ojo",
  "Jide Adewale",
  "Bisi Olatunji",
  "Dapo Ogunleye",
  "Yinka Adeleke",
  "Nike Adeyemo",
  "Tunde Olatunde",
  "Yetunde Akindele",
  "Deji Ogundele",
  "Tope Ogunlola",
  "Fola Olaleye",
  "Bukky Ogunsola",
  "Wale Alabi",
];

var resultPins = ["34565", "5678", "91011", "121314", "151617", "181920"];

for (var i = 0; i < 40; i++) {
  var transaction = {
    SerialNo: i + 1,
    StudentName: studentNames[Math.floor(Math.random() * studentNames.length)],
    ResultPin: resultPins[Math.floor(Math.random() * resultPins.length)],
    Class: classes[Math.floor(Math.random() * classes.length)],
    DateCreated: randomDateAsString2(new Date(2023, 0, 1), new Date()),
    ValidTill: randomDateAsString(new Date(), new Date(2025, 11, 31)),
  };
  SingleSchoolTransactions.push(transaction);
}
