import renderer from 'react-test-renderer';
import { Button } from '../Button/Button';

test('Render Button', () => {
	const tree = renderer.create(
		<Button
			type={'button'}
			variant={'primary'}
			size={'medium'}
			value={'Test value'}
			name={'button'}
		/>
	).toJSON();
	expect(tree).toMatchSnapshot();
});