import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import IdoPointView from '@/views/IdoPointView.vue'
import AdatokView from '@/views/AdatokView.vue'
import HomeView from '@/views/HomeView.vue'
import { useIdoStore } from '@/stores/ido'
import { createPinia, setActivePinia } from 'pinia'

describe('Oldalteszt', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('Betölt az időpont foglaló oldal', () => {
    const wrapper = mount(IdoPointView)
    expect(wrapper.text()).toContain('Időpont foglalás')
  })

  it('Betölt az adatok oldal', () => {
    const wrapper = mount(AdatokView)
    expect(wrapper.text()).toContain('Személyes adatok megadása')
  })
  it('Betölt a kezdő oldal', () => {
    const wrapper = mount(HomeView)
    expect(wrapper.text()).toContain('Üdvözöllek a Turbo Fodrásznál!')
  })
})
