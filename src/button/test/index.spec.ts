import { mount } from '@vue/test-utils'
import { Button } from '..'

describe('Button', () => {
  test('should emit event', async () => {
    const wrapper = mount(Button, {})

    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
  })
  test('should contains some text', () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'my-button',
      },
    })

    expect(wrapper.find('button').text()).toBe('my-button')
    expect(wrapper.html()).toMatchSnapshot()
  })
  test('should contains some className', () => {
    const wrapper = mount(Button, {
      props: {
        size: 'small',
        type: 'primary',
      },
    })

    expect(wrapper.find('button').classes()).toContain('zx-button--small')
    expect(wrapper.find('button').classes()).toContain('zx-button--primary')
    expect(wrapper.html()).toMatchSnapshot()
  })
})
