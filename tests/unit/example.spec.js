import { shallowMount } from '@vue/test-utils';
import Logo from '@/components/Logo.vue';

describe('Logo.vue', () => {
  it('renders props.desc when passed', () => {
    const desc = true;
    const wrapper = shallowMount(Logo, {
      propsData: { desc },
    });
    expect(wrapper.text()).toMatch(desc);
  });
});

// todo
