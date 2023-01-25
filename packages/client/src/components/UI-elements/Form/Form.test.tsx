import renderer from 'react-test-renderer';
import { Form } from '../Form/Form';
import { Input } from '../Input/Input';

test('Render Form', () => {
	const tree = renderer.create(
		<Form onSubmit={()=>{return true;}}>
			<Input
				type={'text'}
				variant={'primary'}
				value={'Test value'}
				name={'Test name'}
				placeholder={'test placeholder'}
			/>
		</Form>
	).toJSON();
	expect(tree).toMatchSnapshot();
});