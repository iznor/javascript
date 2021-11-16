Link To The API Documentation: https://go.postman.co/workspace/My-Workspace~cd195187-e915-41d2-8ee3-9e1085ded4d6/collection/17932571-19efdde2-017c-4bab-a1c2-e27f8334681d

JSON:
{
	"info": {
		"_postman_id": "19efdde2-017c-4bab-a1c2-e27f8334681d",
		"name": "Vacation Manager",
		"description": "# Introduction\nThe service helps managing a family vacation\n\n# Overview\nGiven 2 JSON files: 'members.json' of all the family members and 'dates.json' of all the possible dates for a vacation.\nThe service allows the user to choose a date, edit his choice, watch the choices of the other members, delete his choice, or just watch the details of a specific date or family member.\n\n# Authentication\nUsers should follow this API documentation in order to use it properly.\n\n# Error messages\n\"invalid path\"\n\"can't add item already exist\"\n\"id not found in members.json\"\n\"member is not in the choices list\"\n\"id not found in dates.json\"\n\"list is empty\"\n\"(Empty response)\"\n\n# Rate limit\nNone",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
	},
	"item": [
		{
			"name": "/members/{memberid}",
			"protocolProfileBehavior": {
				"disableBodyPruning": true
			},
			"request": {
				"method": "GET",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": ""
				},
				"url": {
					"raw": "/members/:memberId",
					"path": [
						"members",
						":memberId"
					],
					"variable": [
						{
							"key": "memberId"
						}
					]
				},
				"description": "Get the details of a person by his id"
			},
			"response": []
		},
		{
			"name": "/dates/{dateid}",
			"protocolProfileBehavior": {
				"disableBodyPruning": true
			},
			"request": {
				"method": "GET",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": ""
				},
				"url": {
					"raw": "/dates/:dateId",
					"path": [
						"dates",
						":dateId"
					],
					"variable": [
						{
							"key": "dateId"
						}
					]
				},
				"description": "Get the details of a date by it's id"
			},
			"response": []
		},
		{
			"name": "/choices",
			"protocolProfileBehavior": {
				"disableBodyPruning": true
			},
			"request": {
				"method": "GET",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": ""
				},
				"url": {
					"raw": "/choices",
					"path": [
						"choices"
					]
				},
				"description": "Get an array of all the choices of the family"
			},
			"response": []
		},
		{
			"name": "/choices/{memberid}",
			"protocolProfileBehavior": {
				"disableBodyPruning": true
			},
			"request": {
				"method": "GET",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": ""
				},
				"url": {
					"raw": "/choices/:memberId",
					"path": [
						"choices",
						":memberId"
					],
					"variable": [
						{
							"key": "memberId"
						}
					]
				},
				"description": "Get the choice of a specific person by his id"
			},
			"response": []
		},
		{
			"name": "/choices",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\"memberId\" : memberId, \"dateId\" : dateId}"
				},
				"url": {
					"raw": "/choices",
					"path": [
						"choices"
					]
				},
				"description": "Add a new choice of a family member"
			},
			"response": []
		},
		{
			"name": "/choices/{memberid}",
			"request": {
				"method": "PUT",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\"dateId\" : dateId}"
				},
				"url": {
					"raw": "/choices/:memberId",
					"path": [
						"choices",
						":memberId"
					],
					"variable": [
						{
							"key": "memberId"
						}
					]
				},
				"description": "Edit a person's choice by his id"
			},
			"response": []
		},
		{
			"name": "/choices/{memberid}",
			"request": {
				"method": "DELETE",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": ""
				},
				"url": {
					"raw": "/choices/:memberId",
					"path": [
						"choices",
						":memberId"
					],
					"variable": [
						{
							"key": "memberId"
						}
					]
				},
				"description": "Delete a person's choice by his id"
			},
			"response": []
		}
	]
}
