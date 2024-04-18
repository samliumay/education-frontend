describe('use app config', () => {
  test('app config can be used using useAppConfig', async () => {
    const config = useAppConfig()
    console.log(config)
    expect(config).toBeTypeOf('object')
  })
})
