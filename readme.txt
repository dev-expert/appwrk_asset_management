Run Asset Management System Project:


Step 1: Clone the Project from Git(Befor cloning must add ssh to git hub appwrk.global)
	git clone https://github.com/dev-expert/appwrk_asset_management.git

Step 2: There will be two folders 
		- frontend
		- backend

Move to backend folder and run following commands :
	
	> node collection.js
		
	This above command will create the db and collections in the mongodb but before this 	please ensure that you have installed mongodb on your system and service of mongodb is 	running.

	Now you can run GraphQL server by using following command:
	
	> npm start

 Now move to frontend folder and run following command	 to start React App:
	
	> npm start


	It will automatically open the Browser and run the React App.	
	
	