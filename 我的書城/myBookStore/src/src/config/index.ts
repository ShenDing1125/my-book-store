/**
 * @brief
 *  環境連結配置
 * @data
 *  2023/4
 */
interface BaseConfig {
  baseAPI: string
  mockBaseAPI: string
}

interface EnvConfig {
  development: BaseConfig
  production: BaseConfig
}

class AllConfig {
  env!: keyof EnvConfig
  isMock: boolean = false
  baseAPI!: string
  mockBaseAPI!: string
}

class EnvConfigClass {
  public static envConfigClass: EnvConfigClass = new EnvConfigClass()
  private readonly curEnv = import.meta.env.MODE === 'development' ? 'development' : 'production'
  private envConfig!: EnvConfig
  public allConfig!: AllConfig
  constructor() {
    this.initEnvConfig()
    this.getAllConfig()
  }
  private initEnvConfig() {
    this.envConfig = {
      development: {
        baseAPI: '/myBookStore',
        mockBaseAPI: '',
      },
      production: {
        baseAPI: '/myBookStore',
        mockBaseAPI: '',
      },
    }
  }

  private getAllConfig() {
    this.allConfig = {
      env: this.curEnv,
      isMock: false,
      ...this.envConfig[this.curEnv],
    }
  }
}

export default EnvConfigClass.envConfigClass.allConfig
