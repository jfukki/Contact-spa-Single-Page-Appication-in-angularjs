'use strict';

angular.module('myContacts.contacts', ['ngRoute','firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/contacts', {
    templateUrl: 'contacts/contacts.html',
    controller: 'ContactsCtrl'
  });
}])


//Contact Controller
.controller('ContactsCtrl', ['$scope','$firebaseArray',function($scope,$firebaseArray) {
   
    //Init firebas ... firebase ka link jaha py database pari hui ha! cloud databse 
     var ref = new Firebase('https://jfuki-mycontacts.firebaseio.com/contacts');
    
    //Goin to get contacts // fetching contact from database
    $scope.contacts = $firebaseArray(ref);
    
 
    //Show add form
    $scope.showAddForm = function(){
        
        $scope.addFormShow = true;
        
    }
    
     //Show edit form
//    
//     $scope.showEditForm = function(contact){
//        
//        $scope.addFormShow = true;
//        
//         
//         console.log("woking");
//    }
    
    $scope.showEditForm = function(contact){
        
        console.log("Its active");
        
        $scope.editFormShow = true;
        
        
           console.log("after the form is true");
        
             $scope.id =   contact.$id;
             $scope.name =   contact.name;
             $scope.email=contact.email;
             $scope.company= contact.company;
             $scope.home_phone=  contact.phone[0].home;
             $scope.mobile_phone= contact.phone[0].mobile;
             $scope.work_phone= contact.phone[0].work;
             $scope.city= contact.address[0].city;
             $scope.state=  contact.address[0].state;
             $scope.street_address=    contact.address[0].street_address;
             $scope.zip_code=            contact.address[0].zip_code;
                                  
        console.log("this shit is working...");
    }
    
    
    //hide form
    
    $scope.hide = function(){
        $scope.addFormShow = false;
        $scope.contactShow = false;
    }
    
    
    //Submit Contact
    
    $scope.addFormSubmit = function(){
        
        console.log('Adding Contact  ...... ');
        
        //assgin values
        
        if($scope.name){var name = $scope.name}else{var name= null;}
        if($scope.email){var email = $scope.email}else{var email = null;}
        if($scope.company){var company = $scope.company}else{var company = null;}
        if($scope.mobile_phone){var mobile_phone = $scope.mobile_phone}else{var mobile_phone = null;}
        if($scope.work_phone){var work_phone= $scope.work_phone}else{var work_phone = null;}
        if($scope.home_phone){var home_phone = $scope.home_phone}else{var home_phone = null;}
        if($scope.street_address){var street_address = $scope.street_address}else{var street_address = null;}
        if($scope.zip_code){var zip_code = $scope.zip_code}else{var zip_code = null;}
        if($scope.state){var state = $scope.state}else{var state = null;}
        if($scope.city){var city = $scope.city}else{var city = null;}
        
        //build object
        
        $scope.contacts.$add({
            name:name,
            email:email,
            company:company,
            phone:[{
                mobile:mobile_phone,
                home:home_phone,
                work:work_phone
            }
                  ],
            address:[
                {
                    street_address:street_address,
                    city:city,
                    state:state,
                    zipcode:zip_code
                }
            ]
        }).then(function(ref){
            //primary key
            var id = ref.key();
            console.log("Added Contact with ID:  "+id);
            
            //clear fields
            clearField();
            
            //hide form
            
            $scope.addFormShow = false;
            $scope.contactShow = false;
            
            //Send Message. 
            
            $scope.msg = "Contact Added";
            
            
        });
        
    }
    
    
    $scope.editFormSubmit = function(){
        
        console.log("Updating contact");
        
        var id = $scope.id;
        
        //geting specfic record 
        var record = $scope.contacts.$getRecord(id);
        
        //Assgin values
    record.name  = $scope.name;
    record.email  = $scope.email;
    record.company  = $scope.company;
    record.phone[0].home  = $scope.home_phone;
    record.phone[0].mobile  = $scope.mobile_phone;
    record.phone[0].work  = $scope.work_phone;
    record.address[0].city = $scope.city;
    record.address[0].state  = $scope.state;
    record.address[0].street_address  = $scope.street_address;
    record.address[0].zip_code     = $scope.zip_code;

        //save Contact
        
        $scope.contacts.$save(record).then(function(ref){
            console.log(ref.key);
        });
        clearField();
        
        //hide edit form
        
        $scope.editFormShow = false;
        $scope.msg= "Contact updated";
        
    }
    
    
    $scope.showContact = function(contact){
        
        console.log('Getting Contact');
        
        $scope.name= contact.name;
        $scope.email = contact.email;
        $scope.company = contact.company;
        $scope.mobile_phone = contact.phone[0].home;
        $scope.home_phone = contact.phone[0].mobile;
        $scope.work_phone = contact.phone[0].work;
        $scope.city= contact.address[0].city;
        $scope.state= contact.address[0].state;
        $scope.street_address = contact.address[0].street_address;
        $scope.zip_code = contact.address[0].zip_code;
        
        $scope.contactShow = true;
    }
    
    function clearField(){
        console.log("Clearing all fields..");
        $scope.name = "";
        $scope.email = "";
        $scope.company = "";
        $scope.mobile_phone = "";
        $scope.home_phone = "";
        $scope.work_phone = "";
        $scope.street_address = "";
        $scope.city = "";
        $scope.state = "";
        $scope.zip_code = "";
        
    }
    
    $scope.removeContact = function(contact){
        
        console.log("Enter in the remove function");
        $scope.contacts.$remove(contact);
        
        console.log("Removing the record");
        
        $scope.msg = "Contact Deleted";
        
        console.log("Record deleted");
    }
    
    
}]);