export default {
    data(){
        return {
            messages: {
              en: {
                // Code here ...
              },
              // TODO: might need to have other zh language code ('zh', 'zh-cn', 'zh-hk', 'zh-sg')
              'zh-TW': {
                // InvalidParameterException
                'Invalid email address format.': 'Email 格式輸入錯誤',
                'User already exists': '用戶名稱已存在',
                'An account with the given email already exists.': 'Email 已經被註冊',
                'Password did not conform with policy: Password not long enough': '密碼長度未符合要求',
                'Password did not conform with policy: Password must have numeric characters': '密碼需包含數字',
                'Password did not conform with policy: Password must have lowercase characters': '密碼需包含英文小寫',

                // NotAuthorizedException
                'Incorrect username or password.': '帳號密碼不正確',

                // UserNotConfirmedException
                'User is not confirmed.': '用戶尚未驗證，請確認信箱並且完成驗證',
              }
            },
        }
    },
    methods: {
        // Response i18n error message based on Congito Exceptions
        // Response data:
        // { "code": "InvalidParameterException", "name": "InvalidParameterException", "message": "Invalid email address format." }
      geti18nAuthenticationErrorMessage(originalRawMessage) {

        // Detect the browser default language
        const lang = window.navigator.language || 'en';

        let errori18nMessage = originalRawMessage;
        if (this.messages[lang] && this.messages[lang][originalRawMessage]) {
            errori18nMessage = this.messages[lang][originalRawMessage];
        }

        return errori18nMessage;
      }
    }
};
