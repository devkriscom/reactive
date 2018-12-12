import { dropRight, take } from 'lodash';

export const limitText = (text, limit: integer) => {
	return dropRight(take(removeMd(text), limit).join('').split(' ')).join(' ');
}