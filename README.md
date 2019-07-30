# TictactoeMarvel

This is an webpage in which you can play tic-tac-toe.

Both players choose a Marvel character by name, their images will appear on the scoreboard and then you can start playing. (Data provided by Marvel. © 2014 Marvel)

It has animations when scores go up and when you make a move on the board, very fancy!

## Layout

This webpage has some components in the following layout:

* App
	* Game

		responsible for managing the child component's events, choosing players turn order, waiting for characters to be selected to allow plays on the board, and allowing the user to reset the board.

		* CharacterSelection

			where players input a characters name and it's data CharacterService. Outputs events when characters are selected, with info about them and which player chose.

		* GameScore
		 	* PlayerScore

			characters (with images) and scores are displayed

		* TictactoeBoard

			game board where players interact, implements the game logic. Outputs an event about board end states (who, if any, won).

	* Footer
	
		Information about marvel and links.

Other relevant files:

* character.service.ts

Where API requests are made to get Marvel character information.

* app/animations.ts

Where animations are implemented.

* app/board.ts

Interfaces for the board events.

* app/player.ts

Defines a simple player class.

* styles.css

global styles like font-family and link and button styles, but components also have their own.

* enviroments/secrets.ts

Where your Marvel API private key should go.

## To start developing/build it

You should have npm and angular-cli installed. See more about prerequisites and how to install them at <https://angular.io/guide/setup-local>

**For it to run correctly you need to setup Marvel API keys**, the private in enviroments/secrets.ts and the public in enviroments/environment.ts (and environment.prod.ts).

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.9.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

