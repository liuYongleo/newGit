<template>
    <div class="login">
        <div class="title"><img src="../../static/img/zl-logo.png">北京筑龙信息技术有限责任公司</div>
        <div class="denglu clearfloat">
            <div class="kuang">
                <div class="kuangTil">评委登录</div>
                <el-form ref="dynamicValidateForm"
                         class="login-form">
                    <el-form-item>
                        <el-input v-model="name"
                                  placeholder="请输入用户名"
                                  prefix-icon="el-icon-user-solid">
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="password"
                                  type="password"
                                  placeholder="请输入密码"
                                  prefix-icon="el-icon-unlock">
                        </el-input>
                    </el-form-item>
                    <el-form-item>

                        <el-select class="login-select"
                                   v-model="userType"
                                   placeholder="请选择">
                            <el-option v-for="item in dataIdentity"
                                       :key="item.value"
                                       :label="item.text"
                                       :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="login-btn"
                                   type="primary"
                                   @click="login">登录
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data () {
        return {
            name: this.$route.query.loginname || '',
            password: '',
            dataIdentity: [
                {value: '1', text: '评委', },
                {value: '2', text: '代理', },
                {value: '3', text: '工作人员', },
            ],
            userType: this.$route.query.logintype || '1',
        };
    },
    created () {
        if (this.$route.query.loginname && this.$route.query.logintype) {
            this.login(true);
        }
    },
    methods: {
        async login (routeRepalce = false) {
            let res = await this.portService.login(this.userType, this.name, this.password);
            this.$store.commit('save', {
                path: 'userAuthorization',
                data: `Bearer ${res.data.value}`,
            });

            this.$store.commit('save', {
                path: 'helloModalShow',
                data: true,
            });

            this.resetData();
            if (!routeRepalce) {
                this.$router.push({name: 'list', });
            } else {
                this.$router.replace({name: 'list', });
            }
        },

        // 退出/重新登录后，初始化需要初始化的数据
        resetData () {
            this.$store.commit('save', {
                path: 'leaderId',
                data: '',
            });
        },

        changeIdentity (obj) {
            console.log(obj.value);
        },
    },
};
</script>

<style scoped lang="scss">
    .title {
        font-size: 0.2rem;
        height: 0.8rem;
        line-height: 0.8rem;
        width: 100%;
        text-indent: 3.6rem;

        img {
            vertical-align: middle;
            margin-right: 0.2rem;
            width: 1.5rem;
        }
    }

    .denglu {
        width: 100%;
        height: 6.55rem;
        background: url(../../static/img/login-bg.png) no-repeat;
        background-size: cover;

        .kuang {
            width: 3.6rem;
            height: 3.6rem;
            background-color: #fff;
            border-radius: 0.05rem;
            float: right;
            margin-top: 1.24rem;
            margin-right: 3.6rem;

            .kuangTil {
                height: 0.8rem;
                line-height: 0.8rem;
                font-size: 0.2rem;
                font-weight: 700;
                text-align: center;
                color: #093579;
            }
        }
    }

    .f-field {
        width: 100% !important;
        height: 0.45rem !important;
    }

    .textbox .textbox-text {
        font-size: 0.16rem !important;
    }

    .login {
        position: absolute;
        width: 100%;
        height: 7rem;
        left: 50%;
        top: 50%;
        margin-left: -50%;
        margin-top: -4.3rem;
    }

    .el-form-item {
        margin-bottom: 0.2rem;
    }

    .login-form {
        padding: 0 0.2rem;

        .login-select {
            width: 100%;
        }

        .login-btn {
            width: 100%;
        }

        .el-input__inner {
            border-color: #989898;
        }

        .el-input-group__append,
        .el-input-group__prepend {
            border-color: #989898;
        }
    }
</style>

<style lang="scss">
    .login-form {
        // el-input
        .el-input {
            font-size: $fontXS;

            .el-input__inner {
                height: 0.4rem;
                line-height: 0.4rem;
                padding: 0 0.15rem;
                border-color: #989898;

                &::-webkit-input-placeholder {
                    /* WebKit browsers */
                    color: #666;
                }

                &::-moz-placeholder {
                    /* Mozilla Firefox 19+ */
                    color: #666;
                }

                &:-ms-input-placeholder {
                    /* Internet Explorer 10+ */
                    color: #666;
                }
            }

            &.el-input--prefix .el-input__inner {
                padding-left: 0.3rem;
            }

            .el-input__icon {
                width: 0.25rem;
                line-height: 0.4rem;
            }
        }

        .el-form-item__content {
            line-height: 0.4rem;
        }

        .el-select .el-input .el-select__caret {
            font-size: 0.14rem;
        }

        .el-input__prefix {
            color: #333;
        }

        .el-button {
            font-size: $fontS;
            padding: 0.12rem 0.2rem;
        }
    }

    .el-select-dropdown__item {
        height: 0.34rem;
        line-height: 0.34rem;
        font-size: 0.2rem;
    }
</style>
