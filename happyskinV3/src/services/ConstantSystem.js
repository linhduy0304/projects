import { Platform } from 'react-native';
var DeviceInfo = require('react-native-device-info');

module.exports = ({
  PER_PAGE: 15,
  VERSION: (Platform.OS === 'ios') ? 2032 : 133,
  TIMEOUT: 12000,
  CLIPBOARD_ICON: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAACDxJREFUeAHtWmtsFFUUPme2IGxVEpHQgFIi8fFL0dBuy0uI+kMRSyKKTzTRqMQEkUi3IJr6grYEjYgEfERRkBBDgo+oKC810FckFH+AJhhUniIEkFKxu3P87mx3u7tzZzuzO1sw7k02O/c87z1z77nnmxmiQitEoBCBQgQKEShEoBCBQgT+pxHgTPOWmtFlJJEpZNJEIrkMsiVC1CeTTi48ZjpJxAdJaA8xf0YB+ZQXthzLxWZPutoASLhyNEm0XkTG9mQgn3wE5AwC8hoFuYFrm0/lw1dKADBhpnDFCyTmfNzpFF4+nLu1ycz7qIireEHzLrc6buUSk4xNvvwjEbrHrXJvymGg7URFk3hR47d++jUSxsKhl87XyasxYkUWE0fXyfzRIxJj9uGiyDIeDo0V03w2kz0m/gOb4nfIdGaSy5E3AFMdgRvRV2cHq3Qgn418CN5oHT8bmrUFpLq8EcYrdAaw/36ggPEkL2xq1vH9pkn1mIsQ4ydg90WMqZ/OPgeMqVzXvE7H80pjmVteKRHZrlPE5JdSMPg0126N6Pj5pCEQV5N0bhKSoel+cDps54bWMen0bPoGRWiKThFOdpyryavxcMO2n8igR3RjA61C5oUGO/A8kQ1imaDVCARmnos7nzwWrm/ZgFW4PpmmrpEj1I0bl07Ppm+QsH2JEZ2gBY3abZGNk5x0WL5w0FeVac5NHYMldit8EJHHyXM+tMB+7SiE/NkCSDIBjYNeT3qaMcRIIg5jMa0j3FHPJcMXI5l8Se2ES6m94w7kmsnYvNcgvQ1B0C/W6SDx/gb+Mm5oqU/wkaUomug5Xkh16BZkh0UQwOkhRwGmDkBzM+7vJ9zQ2OKkmLcASPhmFDWnqulM+yzspaAq5WItcREnJP6R3IZhEnUSLjvO9a1vWwyzWzMhmHaBo/wqisqnSXXD5QgCfoTaJjJP5pRtI6Oomuvtea27FE4zmktXwuXXkXmqTUyZh0kFPdsSnuZJJ0pVSZO3qSLkY8SMbBOr3AfgS2q+B0BqKiaQKduwzEuT/Hi8FAAfL41dyaPcn0/h8jUIViIIvgbAAipRcx0iXuxl+MmyGJnaI0uSaT1eB2QtsMrhHuUggBU5jWpCL8dlfQ0A/RNZhTt/Sdx4+j8mdxbH6278mmw/4kYkwbWAvBNR5m5K6Kok2EOznhr17VcOm8sRiGYLuGXQsbYmAKAS8S0JSk3oTomaekBF3IFT4DkKFq9AdXk6w9jsLBdJUCnxK98ppDojbkDmVoQoai7Fch8Vp6X8i3ViVPq3AkxzdoqDrg7uBo6jPtfjri72PHllw8UK0PpV6DUYrIT/N3R8BKZCAUGja8+lynB3kkhl6HtdwER79xWgsYCNXrVnalLCShF2UalaWKY4ONsCdinKXR0AQRXfP2084UE2WiZCp4y3AEqaDPbkegVo0sgeu45jOerGkBUEADutLIAgtgAeQ6c1JLISmRO6Mo3s3GU7oLKEnYGMs610jph61Md8KF3UsQ9gh5V+wsYHEFQ5oNXGsAjyip6uoToCEwcgozGhI8ncSlU6T9fxSIocxm2XxkrE0Wq/0ZAsUVvAhreVCayCu1DR6Z3bfDgAE0cgYzNgI8irlf0pGlmpq/BwN/dkkVdsoApzDBjUv/QbZMpfbSNQBFPelznlywBoLtTy80TEETaGDkfbkFfKtS4MjuEELdMbsYhrP/4HNfJ8TFY9bU1pat1gLczg9jP3IxBbyJB9IO2gK0au4cff6kwRdtGR2rISajemwU6pg/gAlGojJRK9wYGPAeFmDR34phPfKz1WCNU1reZwaBqW2+06A1gqCr5W4R0hmhDv3TlDVjw23ksQrKTaLk1C5iUxOzpPmWnYyxEyjEd55pdnM0u651qFUCxJ9LkP5+WPblRVEUF72+5xI9stYz6PQDqWyd1yGa6YZ3Fd08YMEp5ZiUoQSeUvlKrjscS+dmfFHO5OrkuK2Zt8knHsQ2AIYzrXN/u29OPmEwFQBBQNJ6is9DashGcQiONxIe2/8FYt3ZHIWxxZGRhYnVvwQr6CG5ptOSqDmmuWDQzx3R+rB1CLkfnf5faOhwBiqtAfh2VvyVr7EMAGFd73rr0owRJjIR+Sa7ENlL2MDcE/jGz3OcroNVzXsjmjcI5MWwDi9qzVQPQ6+q8jGEXceXYwPpYYRH35F65tORWXc/vPsxs7IDsFb3yG4DHVML0en6Rgv0NdvvUiPlMdA5Dsx6qniQ6Apn72piotHNq2xpKyxRQfuUaV3rby26brN0EBvLQhqjPeNsCs/OoAlWXIEchk5SYnJR3Aw7j9CYC+zkZ8HYBMTjPxrqxqECzRErsmH/QnAIY4PHfn6TFAY3fdqxSWBQ7+Wn0JAJ7J/YzTYXe6EwvIRCIfSO1k74/G041l2ZeasocxjqladQBBXwJgGWd6R+cEeaeMzhxpA96wHkLqZPJBUx9aAL8slyi9p7OPG7YvBgR13CxosuTWC2j/sT2I9nAndevRFPNO8PE9YJ6aqO8YBccsT8RY8LWJvmEsD+A55WqcBP41qS67CY6/gmNXx6t/nr1ZwqQ/o4aWKqwCn47BLv+x5/n8lLfh9K40qsxdVFwM4Bd7/e9fDkgEoXkZG8aDcPB3706tZ28Y0wYqDt6Iwi7xbsL3AKhhALWtQi1fgWjntY7vecoxCUz8GMYym0aVTkovs33NAboB4b39RNDvRak8WV+M6LRyp2HS6hkgAJusJx6wkus3ahNv3gOQPBXrmwE5DTAk+HYgT83Ah5wB4zD1ueBIF4bJk6OC2UIEChEoRKAQgUIEChH4r0fgX9gasz3jn1vgAAAAAElFTkSuQmCC',
  MORE_ICON: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAQlBMVEUAAABEREQ9PT0/Pz8/Pz9AQEA7OzszMzM/Pz8/Pz9FRUU/Pz8/Pz9VVVUAAAA/Pz8+Pj4/Pz8/Pz9BQUFAQEA/Pz+e9yGtAAAAFnRSTlMAD5bv9KgaFJ/yGv+zAwGltPH9LyD5QNQoVwAAAF5JREFUSMft0EkKwCAQRFHHqEnUON3/qkmDuHMlZlVv95GCRsYAAAD+xYVU+hhprHPWjDy1koJPx+L63L5XiJQx9PQPpZiOEz3n0qs2ylZ7lkyZ9oyXzl76MAAAgD1eJM8FMZg0rF4AAAAASUVORK5CYII=',
  GOOGLE_PLUS_ICON: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAACQ1BMVEUAAAD/RDP/STX9Sjb+STT+SjX+SjX+SjX+STT/SzP/Sjb/SzX/VVX/SDb+SDP+SjX9RzT9STT9SjT+STX+SjT9SjT/SST/TTP+SjX+SjX/RDP/RzP+SjX+SjX/STf9SDX/SjX/TU3+Sjb+SjX/Qyz/Szb+SjX/TTP+SjX9STX+SjP/TTX9Szb+Szb/YCD/SzX/SzX+Sjb+STX/TTX/SzX/Szb/TDT+SjX9SzX/STf+TDX/SjT9SzX9Szb+SjX/SjX/SzX/STT9SjT9TDT+SDT/VQD9STX/STX9SjX+SjX9STX+SzT/UDD9Sjb+SjX9RzT/QED+SjT+SjX/XS7+SjX/Ui7/RC3+SjX/TTz/RzP+SjX/TTP/STf+SjX/STT/RjP+Sjb/SzX/Szz/Rjr/RzL+RzP+SjX/Szf/SjX9Sjb+SjX+Sjb+SjX+SjX+SjX/STf/SjT/SjT9SjX9SzT+RzT+STT/STT+SjX/STP/Tjf+SjX/Szb/SjX/STX9SjX/SjT/AAD/SjH/STb+SzX+Sjb+SjT9SDT+Sjb+SjX9STf9STT/SDX/TDf+STb/TjT/TjH+SjX+SDT/Sjb9SzX9RzX+TDT/TUD/STX+SjX+STX/VTn/QjH/SjX+SjX/Ri7+Szb/TTP+SjX/SDX/STT9SjX+SjX/SDL/TjT9Sjb/RjL+SjX9SzX/QED/TDT+SjX+SjX9STX/RjX/VSv/Rzb/STX/ORz/UDD9SzX+Sjb/STT9SzP+SzX+SjX+SjX9Szb/Ti//ZjPPn7DtAAAAwXRSTlMAD1uiy+j5/8FBZHQDY9zvnYSc5dGhBwr+1S0Zqu44mz4KtNkXY7Yo8YLcfp3bCGZ+sLhWaks2z4wO6VOklrtWRFSXos4DoD+D/ZnoEKasjwS7+gvfHC3kHmjtMlTXYjfZXBEWa+/nQRiK5u7c8vVGRWepp6+5eulQF/dfSHSQdQEfdrzguZzm+4KSQyW1JxrAvCaCiLYUc8nGCR9h6gvzFM41MZHhYDGYTMejCEDi3osdBj1+CSCWyGyp1PC3hUEF/yhErwAAAjFJREFUSMft1tdfE0EQB/ADJD+JKAomHoqKxhJLFCnSpdgIxobYgqhYaJKIHVQUsSFiBSuCvWPv3T/N2ZPD3EucvVcyL3sz2W8+l73ZvShKKEIxcCIsPGJQpAV9MThK1KzAEAaNHjosZviI2DgBR9psVrvCx6Ni1fjRNI5JIDx2nF5m4ejxsCRqVxMmknZMksGTVUzpu5zqJD1NAodNB2boyUzCrlnK7CSKOUCyGJOC4BSan6onaWLN5irpCIwgOAMBt5eZRVk2H+fQx7n92TzK8pT8AopCwCbGgiB4Pk1fsFDPFlG2mL9gRTTdnahnxcASDx/nq6SX6tkyYLnEo1qxknBJ2t9kVSlcq2WaZM1a0qXrtOv18Jbp9Q3l5Rv/39ubHKQ3V2xRtm7bXlkluyGra2qJ76jzwb/TxH721O9K3U1fsMfsgbCXcLFZvI+wL8ok3i/6+ECDOdxYJ/TBQ9Kw+nDTkRyHtodKjjbLyGMtx304cTKi8NRpoVutfJp5xgtv21ntxGw/J7T3PNdeuAhcuqxn9o5W0p1Ma78CpF/9lzdfI3ydiStobrjhIL4BRN7k4WRa3i5D5RbQ3cPDMcDtO4ZKGXCXedtuQL1nqNwHHjDxQ/rNGYbKI/gfM/ETwv6ngafSM3RwH3O7eK86Wzz9L582PO9lN9iLl6KpXr2uf9P7tvHde4e75oNEZ3/85NQ2hKUyzg/1c57klur68vXbd9XtdP34+et36C9WKAZo/AEHHmXeIIIUCQAAAABJRU5ErkJggg==',
  FACEBOOK_ICON: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE8AAABPCAYAAACqNJiGAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsSAAALEgHS3X78AAAFLklEQVR42u2cT2wUVRzHP+/N7s6yuy0t2z/SRimiBQwRrAYSKxIvoiBGQxMtFxNNpBcSEr14UGM4cPSAh0JC4snlQDwQPWgM0YQajI22pvwJf4qUFrZ/tt1lu9v9O+NhC2lI053daR2meZ/z7OtvP3lvfm+++zqCeTq7e31AD9ANbANCKB4wCwwBEaC3L9KTAxAAnd29rcAPwA6nq3QBA8BbfZGeMTE/4/5AiauEQWCXBA6jxFXKduBjCRxyuhKXckgCHU5X4VJekIDP6Spcii6drsDNKHk28DhdwEpimmCaJoZpVvQ5j2ZtTq0qeUIIDMMgnsyQSGYwDBPd58HrkQghLI4B4boAmpRlpa8KeVIKCgWDO9E4AM9tamL/ns3s2NpC07ogtSE/UlqTl80V+OLEL0zPpAkGlu6lrpYnBGhSMnIvQTZX4M1X2+nau409OzeyRvdWPa5Xk+TyRYJlrnOtvNIyNLl0Y5ztW9bz6Ye7eWN3u+1x03N5DNO0NFNdKa90bzO5MjzBwde38c3nB9B9//9Xcak8uDI8wQfvdPD1Z/sdq8N1+zyPR3Lt3yn2dj7rqDhwmTwpBdGpWZrDIU4de9fpcty1bA3DZDqe5tvjXdQEdafLcc/MEwKik0k6Ozawb89mp8sBXCQPBDPJDO/te97pQh7iGnnJVJb2tjAHXtvidCkPcY28yekUr3S0EVyzsvGj1VAAXCQvXzDYtf3JFf87Pp9W2oRbSGJc0W3zBYOG+gBbnm60PdZvf97i6vAkI/fiJGezCCFYGLgUiyaZTN5SN3eFvFQ6x4aWOjZvbKh6jN//HuH4qV8ZuHyXuWwB3edBW+T5VUhBa3MtPq+GYayCSCqbLxCuC+D1aFV9/qcL1zn0yRl03Utbax2alJhllmU5ceASeYWCUXWjGI/NcuTYOcJ1QVqaaigUjbLirOKKhlE0DHS9ull3+mw/47HZh+KWE1fIwwRpMUZ/lIsDIzSHl18cuEVelUSnkkzEUoSCK7M3XNXyxsbvM5Ocw+etbsmXY1XLKxompmFS3YIvz6qWJ4VACMHy9NZFxnf6C7oZJc8Gjm2SH/zmevtunHQmv+S1E7djjFURCqQzea7dnKR+nfWnE92r0dZaD/D4nhgoGiapdJaPul6ipal2yWsTyQxbN1UeCjzzVJgTX76N3++1vE+cy+Y58+Mg2VyxbJcWnd29K3U/XZJ8wWBqJsWF7w6zvrHGiRIWJRZP8/L7vayt8ZeV59g9T4hS8Dg2ft+pEhbl/MWbJJIZS3tD1TAeYfBq1PKhICXvEYZHpwlYTHCUvAUkkhlGowlCASWvYoauj3MnmiDgt3Y8TclbwGg0wdxcXt3zqmHg6j2kZj1GUPIWcGt0hqDfevan5M0Ti6dLzaKC4FTJm+fS9QlGK2gW4KA804RC0aC1udb+YMtALJ4imcpa/pcDcDAY0DTB2pCf02f7LQcDlR7YvjuR5PufhywFA+cv3qS5obJnbOfkSUFtSOf02X5LkVTXwRcrlndjJMaRr85ZiqQa1wV5oiFELl98/OVVsmx1r1bV8g74vbRvaqR+7RpLp58qEQeqYdhCybOBkmcDJc8GSp4NlDwbKHk2UPJsoOTZQMmzgZJnAyXPBkqeDZQ8Gyh5NlDybKDk2UDJs4GSZwMlzwYSyDldhEuZlcBfTlfhUoYkpVd2KyonIoGTlN44rbDOP8BJ2RfpyQL7Kb3zXFGeQWBfX6QnKwH6Ij1jwC7gKNAPpJyu8DEjRcnLUWDnvC/+A7XomQQ1U+xDAAAAAElFTkSuQmCC',
  // FLATLIST_VITUAL: DeviceInfo.getModel() == 'iPhone 5' ? true : false
  //FLATLIST_VITUAL: false
});
module.exports.cities = ([
{
value: "an-giang",
label: "An Giang",
type: "PROVINCE"
},
{
value: "ba-ria-vung-tau",
label: "Bà Rịa - Vũng Tàu",
type: "PROVINCE"
},
{
value: "bac-can",
label: "Bắc Cạn",
type: "PROVINCE"
},
{
value: "bac-giang",
label: "Bắc Giang",
type: "PROVINCE"
},
{
value: "bac-lieu",
label: "Bạc Liêu",
type: "PROVINCE"
},
{
value: "bac-ninh",
label: "Bắc Ninh",
type: "PROVINCE"
},
{
value: "ben-tre",
label: "Bến Tre",
type: "PROVINCE"
},
{
value: "binh-dinh",
label: "Bình Định",
type: "PROVINCE"
},
{
value: "binh-duong",
label: "Bình Dương",
type: "PROVINCE"
},
{
value: "binh-phuoc",
label: "Bình Phước",
type: "PROVINCE"
},
{
value: "binh-thuan",
label: "Bình Thuận",
type: "PROVINCE"
},
{
value: "ca-mau",
label: "Cà Mau",
type: "PROVINCE"
},
{
value: "can-tho",
label: "Cần Thơ",
type: "PROVINCE"
},
{
value: "cao-bang",
label: "Cao Bằng",
type: "PROVINCE"
},
{
value: "da-nang",
label: "Đà Nẵng",
type: "PROVINCE"
},
{
value: "dac-lac",
label: "Đắc Lắc",
type: "PROVINCE"
},
{
value: "dac-nong",
label: "Đắc Nông",
type: "PROVINCE"
},
{
value: "dien-bien",
label: "Điện Biên",
type: "PROVINCE"
},
{
value: "dong-nai",
label: "Đồng Nai",
type: "PROVINCE"
},
{
value: "dong-thap",
label: "Đồng Tháp",
type: "PROVINCE"
},
{
value: "gia-lai",
label: "Gia Lai",
type: "PROVINCE"
},
{
value: "ha-giang",
label: "Hà Giang",
type: "PROVINCE"
},
{
value: "ha-nam",
label: "Hà Nam",
type: "PROVINCE"
},
{
value: "ha-noi",
label: "Hà Nội",
type: "PROVINCE"
},
{
value: "ha-tinh",
label: "Hà Tĩnh",
type: "PROVINCE"
},
{
value: "hai-duong",
label: "Hải Dương",
type: "PROVINCE"
},
{
value: "hai-phong",
label: "Hải Phòng",
type: "PROVINCE"
},
{
value: "hau-giang",
label: "Hậu Giang",
type: "PROVINCE"
},
{
value: "ho-chi-minh",
label: "Hồ Chí Minh",
type: "PROVINCE"
},
{
value: "hoa-binh",
label: "Hoà Bình",
type: "PROVINCE"
},
{
value: "hung-yen",
label: "Hưng Yên",
type: "PROVINCE"
},
{
value: "khanh-hoa",
label: "Khánh Hòa",
type: "PROVINCE"
},
{
value: "kien-giang",
label: "Kiên Giang",
type: "PROVINCE"
},
{
value: "kon-tum",
label: "Kon Tum",
type: "PROVINCE"
},
{
value: "lai-chau",
label: "Lai Châu",
type: "PROVINCE"
},
{
value: "lam-dong",
label: "Lâm Đồng",
type: "PROVINCE"
},
{
value: "lang-son",
label: "Lạng Sơn",
type: "PROVINCE"
},
{
value: "lao-cai",
label: "Lào Cai",
type: "PROVINCE"
},
{
value: "long-an",
label: "Long An",
type: "PROVINCE"
},
{
value: "nam-dinh",
label: "Nam Định",
type: "PROVINCE"
},
{
value: "nghe-an",
label: "Nghệ An",
type: "PROVINCE"
},
{
value: "ninh-binh",
label: "Ninh Bình",
type: "PROVINCE"
},
{
value: "ninh-thuan",
label: "Ninh Thuận",
type: "PROVINCE"
},
{
value: "phu-tho",
label: "Phú Thọ",
type: "PROVINCE"
},
{
value: "phu-yen",
label: "Phú Yên",
type: "PROVINCE"
},
{
value: "quang-binh",
label: "Quảng Bình",
type: "PROVINCE"
},
{
value: "quang-nam",
label: "Quảng Nam",
type: "PROVINCE"
},
{
value: "quang-ngai",
label: "Quảng Ngãi",
type: "PROVINCE"
},
{
value: "quang-ninh",
label: "Quảng Ninh",
type: "PROVINCE"
},
{
value: "quang-tri",
label: "Quảng Trị",
type: "PROVINCE"
},
{
value: "soc-trang",
label: "Sóc Trăng",
type: "PROVINCE"
},
{
value: "son-la",
label: "Sơn La",
type: "PROVINCE"
},
{
value: "tay-ninh",
label: "Tây Ninh",
type: "PROVINCE"
},
{
value: "thai-binh",
label: "Thái Bình",
type: "PROVINCE"
},
{
value: "thai-nguyen",
label: "Thái Nguyên",
type: "PROVINCE"
},
{
value: "thanh-hoa",
label: "Thanh Hoá",
type: "PROVINCE"
},
{
value: "thua-thien-hue",
label: "Thừa Thiên Huế",
type: "PROVINCE"
},
{
value: "tien-giang",
label: "Tiền Giang",
type: "PROVINCE"
},
{
value: "tra-vinh",
label: "Trà Vinh",
type: "PROVINCE"
},
{
value: "viet-tri",
label: "Vĩnh Phúc",
type: "PROVINCE"
},
{
value: "vinh-long",
label: "Vĩnh Long",
type: "PROVINCE"
},
{
value: "vinh-phuc",
label: "Vĩnh Phúc",
type: "PROVINCE"
},
{
value: "yen-bai",
label: "Yên Bái",
type: "PROVINCE"
}
]);