import { mount, VueWrapper } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import App from '../../App.vue'

describe('MyApp', () => {
    const wrapper: VueWrapper<any> = mount(App, {
      global: {
        plugins: [createTestingPinia()],
      },
    }) ;
  
    it('does a wrapper exist', () => {
      expect(wrapper.exists()).toBe(true)
    })
  })
