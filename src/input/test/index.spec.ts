import { mount } from '@vue/test-utils'
import { Input } from '..'

test('should render input', () => {
  const wrapper = mount(Input, { })

  expect(wrapper.html()).toMatchSnapshot()
})
