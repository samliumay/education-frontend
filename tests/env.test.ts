describe('use app config', () => {
  test('app config can be used using useAppConfig', () => {
    const config = useAppConfig()
    console.log(config)
    expect(config).toBeTypeOf('object')
  })
})
