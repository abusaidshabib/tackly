const data = [{ "_id": "642af9ebc90783dcce2f1305", "email": "abusaidshabib.cse@gmail.com", "title": "English", "details": "afsasdfsadf", "time": "2023-04-03,10:07PM", "string": "2023-04-03T22:07" }, { "_id": "642af9f3c90783dcce2f1306", "email": "abusaidshabib.cse@gmail.com", "title": "Math", "details": "Demo", "time": "2023-04-03,10:07PM", "string": "2023-04-03T22:07" }, { "_id": "642b1de5342400c6b7d60571", "email": "abusaidshabib.cse@gmail.com", "title": "Gonit", "details": "afsdasdfasfda", "time": "2029-02-09,5:41PM", "string": "2029-02-09T17:41" }, { "_id": "642b1e1f342400c6b7d60572", "email": "abusaidshabib.cse@gmail.com", "title": "morn", "details": "moron", "time": "2020-06-12,2:42AM", "string": "2020-06-12T02:42" }];

data.sort((a, b) => {
  const dateA = new Date(a.string);
  const dateB = new Date(b.string);
  return dateA - dateB;
});

console.log(data);