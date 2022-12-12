import renderer from 'react-test-renderer';
import { Input } from './Input';

test('Render Input', () => {
	const tree = renderer.create(
		<Input
			type={'text'}
			variant={'primary'}
			value={'Test value'}
			name={'Test name'}
			placeholder={'test placeholder'}
		/>
	).toJSON();
	expect(tree).toMatchSnapshot();
});