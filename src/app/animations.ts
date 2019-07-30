
import { state, trigger, style, animate, transition, group, query, keyframes } from '@angular/animations';

export let fadeAnimation = trigger('fade', [
	state('void', style({ transform: 'scale(0.01)', })),
	transition(':enter, :leave', [
		animate(150)
	])
])

export let floatAnimation = trigger('float', [	
	transition(":increment", [
		animate(600,
			keyframes([
				style({ opacity: '1', offset: 0 }),
				style({ opacity: '0', transform: 'translateY(-100%)', offset: 1 }),
			])
		)
	])
])