import { mount } from '@vue/test-utils'
import ShowsList from '../SearchShowsList.vue'

describe('ShowsList', () => {

  jest.mock('swiper', () => ({
    SwiperModule: jest.fn(),
  }));
  it('renders properly without shows', () => {
    const wrapper = mount(ShowsList, {
      props: {
        title: 'ShowsList',
        noResultsText: 'No results to show',
        shows: [],
        hasMore: false,
        isLoading: false,

        isHorizontal: false
      }
    })
    expect(wrapper.exists()).toBeTruthy()
    expect(wrapper.text()).toContain('ShowsList')
    expect(wrapper.text()).toContain('No results to show')
  })
})
