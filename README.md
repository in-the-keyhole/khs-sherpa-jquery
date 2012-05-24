khs-sherpa-jquery 
=================

JQuery remote data JSON library 

About
-----

This project implements a JQuery Mobile user interface that interacts with khsSherpa (https://github.com/in-the-keyhole/khs-sherpa) 
Java/JSON remote end points. 

This example implements server side Sherpa end points that return Stock Quote information and 
displays information in a JQuery mobile user interface. 

It will run under any java application server using JDK 1.6 and above.

Getting Started
---------------
To build it clone then use Maven:

    $ git clone ...
	$ cd khs-sherpa-jquery
	
	Compile and build WAR
	$ mvn clean package
	
	Deploy war to app server, start and access with...
	http://localhost:8080/khs-sherpa-jquery/stocks-phone.html

JQuery Mobile Demo Application
-------------------------------
This example JQuery Mobile application calls a StockService endpoint that return stock pricing information from the
server for display using and HTML 5 user interface. 

It demonstrates the use of the sherpa.js library that provides an easy to use api for accessing server side 
java end point and processing the resulting JSON objects. 

The java script example shown below shows how the Sherpa StockService will return JSON stock objects. Call back method
is provided to process resulting JSON objects. 

	$.sherpa.call({endpoint:'StockService', method:'quotes'}, listStocks);

To use, just reference the sherpa.js java script file located in this projects src/webapp/javascript/0.0.1 folder
 
 
 

 
 
 
 
 