/*
 * Copyright [yyyy] [name of copyright owner]
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *    http://www.apache.org/licenses/LICENSE-2.0
 */

const fs = require('fs')

var input_file = "input.ics"
var output_file = "output.txt"

var months_name = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Décembre"]
//var months_name = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

var regex = /BEGIN:VEVENT.*?DTSTART;VALUE=DATE:(?<year>....)(?<month>..)(?<day>..).*?SUMMARY:(.. )?(?<name>.*?)[\n-].*?/gms


fs.readFile(input_file, 'utf8', (err, data)=>{
	if (err) {
    	console.error(err)
	    return
	}

	// Read and get the infos
	let match
	let list = []
	while((match = regex.exec(data)) !== null){
		list.push(match.groups)
	}

	//Sort by date
	list.sort((a, b)=>{
		if(a.month < b.month) return -1
		if(a.month > b.month) return 1
		if(a.day < b.day) return -1
		if(a.day > b.day) return 1
		return 0;
	})

	//Select by month
	let months = []
	list.forEach(obj=>{
		let m = parseInt(obj.month)

		if(months[m] == undefined)
			months[m] = []

		months[m].push(obj)
	})

	//Making the string
	let str = ""
	months.forEach((list, n)=>{
		n--
		str += months_name[n] + '\n'

		list.forEach(obj=>{
			str += obj.day + '-' + obj.month + " : " + obj.name + '\n'
		})

		str += '\n\n'
	})

	console.log(str)

	//Writing file
	fs.writeFile(output_file, str, err => {
	  if (err) {
	    console.error(err)
	    return
	  }
	})
})
