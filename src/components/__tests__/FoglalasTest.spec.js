import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import IdoPointView from '@/views/IdoPointView.vue'
import AdatokView from '@/views/AdatokView.vue'
import HomeView from '@/views/HomeView.vue'
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
    expect(wrapper.text()).toContain('Üdvözöllek a fodrásznál!')
  })
  it('Check username input field', async () => {
    const wrapper = mount(AdatokView)
    const nameInput = wrapper.find("input#nev")  
    await nameInput.setValue("Marci")
    expect(nameInput.element.value).toBe("Marci") 
  })
  it('Check phone input field', async () => {
    const wrapper = mount(AdatokView)
    const phoneInput = wrapper.find("input#nev")  
    await phoneInput.setValue("+36305304361")
    expect(phoneInput.element.value).toBe("+36305304361") 
  })
})



