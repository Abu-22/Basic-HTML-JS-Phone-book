class Person{
    constructor(name,number){
        this.name = name;
        this.number = number;
    }

    getName(){
        return this.name;
    }

    getNumber(){
        return this.number;
    }
}





class Persons{

    constructor(){
        this.personsList = [];
       
    }

    addPerson(){

        var name = document.getElementById('name').value;
        var number = document.getElementById('number').value;
        let p = new Person(name,number);
        this.personsList.push(p);
        var table = document.getElementById("myTableData");
        var rowCount = table.rows.length;
        var row = table.insertRow(rowCount);
        row.insertCell(0).innerHTML= name;
        row.insertCell(1).innerHTML= number;
        row.insertCell(2).innerHTML= '<input type="button" value = "Delete" onClick="globalPer.deleteRow(this)">';
        this.updateTable();
        document.getElementById('name').value = '';  
        document.getElementById('number').value ='';
        inputCheck();
    }


    deleteRow(obj) {

        var index = obj.parentNode.parentNode.rowIndex; // This index starts from 1. 
        var table = document.getElementById("myTableData");
        table.deleteRow(index);
        this.personsList.splice(index-1,1); // index  = index-1 in our PersonList
        if(this.personsList.length==0){
            document.getElementById("myData").style.display = "none";
           }
    }

    

    sortAlphabetically(){

        var list = this.personsList;
        var changed = true;
        var switchCount = 0;
        var direction = 'asc';   
        
       
        while( changed == true){
            changed = false;
            for (var i =1; i< this.personsList.length;i++){
                if(direction =='asc'){
                    if (list[i-1].getName().localeCompare(list[i].getName()) == 1){    // if 1 then list[i] is first and then comes lisr[i-1], If -1 then it is in asc order already. if 0 = both are the same
                        var temp = new Person(list[i].getName(),list[i].getNumber());
                        list[i] = list[i-1];
                        list[i-1] = temp; 
                        changed = true;
                        }
                }
                else if(direction == 'desc'){
                    if (list[i-1].getName().localeCompare(list[i].getName()) == -1){   
                        var temp = new Person(list[i].getName(),list[i].getNumber());
                        list[i] = list[i-1];
                        list[i-1] = temp; 
                        changed = true;
                        }
                }
                if (changed==true){
                    switchCount ++;
                }
            }

            if(switchCount == 0 && direction== 'asc'){      // Swap direction of sort based on if any swaps/changes were made.
                direction='desc';
                changed=true;
            }
            
        }

        this.personsList = list;
        this.updateTable();
    }

    sortNumerically(){   

        var list = this.personsList;
        var changed = true;
        var switchCount = 0;
        var direction = 'asc'; 

        while( changed == true){
            changed = false;
            for (var i =1; i< this.personsList.length;i++){
                if(direction =='asc'){
                    if (list[i-1].getNumber().localeCompare(list[i].getNumber()) == 1){    // if 1 then list[i] is first and then comes lisr[i-1], If -1 then it is in asc order already. if 0 = both are the same
                        var temp = new Person(list[i].getName(),list[i].getNumber());
                        list[i] = list[i-1]
                        list[i-1] = temp; 
                        changed = true;
                    }
                }
                else if (direction== 'desc'){
                    if (list[i-1].getNumber().localeCompare(list[i].getNumber()) == -1){   
                        var temp = new Person(list[i].getName(),list[i].getNumber());
                        list[i] = list[i-1]
                        list[i-1] = temp; 
                        changed = true;
                        }
                }
                if (changed==true){
                    switchCount ++;
                }
            }
        
            if(switchCount == 0 && direction== 'asc'){
                
                direction='desc';
                changed=true;
            }
        }
        
        this.personsList = list;
        this.updateTable();
    }

    
    updateTable(){

        var table = document.getElementById("myTableData");
        table.innerHTML='<tr>'
        +'<td><b>Name  </b> <i id="sortAlphaIcon" class="fa-solid fa-sort" onclick="globalPer.sortAlphabetically()"></i></td>'
        +'<td><b>Number  </b> <i id="sortNumIcon" class="fa-solid fa-sort" onclick="globalPer.sortNumerically()"   ></i></td>'
        +'<td></td>'
        +'</tr>'; // Clear all previous display

      
        for(var i=1; i<= this.personsList.length;i++){

            var row = table.insertRow(i);
            row.insertCell(0).innerHTML= this.personsList[i-1].getName() ;
            row.insertCell(1).innerHTML= this.personsList[i-1].getNumber();
            row.insertCell(2).innerHTML= '<input type="button" value = "Delete" onClick="globalPer.deleteRow(this)">';
        }
       if(this.personsList.length>0){
        document.getElementById("myData").style.display = "block";
       }


    }

    load(){
        if(this.personsList.length==0)
            document.getElementById("myData").style.display = "none";
            inputCheck();
    }


}



function inputCheck(){
    var nameText = document.getElementById('name').value;
    var numberText = document.getElementById('number').value;
    var alphaTest = new RegExp("^([a-z A-Z ]+$)");
    var numTest = new RegExp("^([0-9 ]+$)");
    if ((nameText != '' && alphaTest.test(nameText)  ) && (numberText !='' && numTest.test(numberText)) ) { 
        document.getElementById('addBtn').disabled = false; 
        document.getElementById("invalidInputText").style.display="none";
    } else { 
        document.getElementById('addBtn').disabled = true;
        document.getElementById("invalidInputText").style.display='block';
    }
}





var  globalPer = new Persons();