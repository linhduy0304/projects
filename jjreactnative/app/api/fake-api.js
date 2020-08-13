const fakeApi = {
    /**
     * coupon
     */
    confirmBooking(data) {
        let fakeData = {
            "booking_note": "hay lam",
            "booking_platform": "App/Android",
            "booking_platform_version": "v4",
            "booking_schedule_id": data.booking_schedule_id,
            "booking_source": "direct",
            "booking_survey": data.booking_survey,
            "cancel_time": "N/A",
            "check_in_time": data.check_in_time,
            "code": "JJ64234434",
            "coupon_highlight": "M1T1",
            "deal": {
                "booking_slot": 10,
                "booking_store": "Mipec Long Biên, số 2, phố Long Biên 2 , phường Ngọc Lâm, quận Long Biên, HN",
                "booking_username": "Birdy Adam",
                "brand": {
                    "brand_desc": "Công ty luôn mong muốn mang tới cho khách hàng những dịch vụ cùng những sản phẩm tươi ngon và mát lành nhất. Chính vì thế, nguồn nguyên liệu từ trà, sữa, các loại thạch, trân châu đều được Nhà hàng tự tay chế biến từ nguồn nguyên liệu tự nhiên và đảm bảo cho sức khỏe của người tiêu dùng. Với hương vị thơm ngon, chất lượng luôn được đảm bảo lại cộng với thực đơn luôn đa dạng và phong phú, trà sữa TocoToco dù mới xuất hiện tại Việt Nam chưa lâu nhưng đã chiếm được rất nhiều sự yêu thích của nhiều gia đình cũng như các bạn trẻ. Là một thương hiệu của Đài Loan, thế nên hương vị của TocoToco đúng “chất” trà sữa trân châu không chỉ về hương vị, mà còn ở chất lượng những nguyên liệu đi kèm như trân châu hay sữa bột, rau câu.\r\n\r\nĐiều đầu tiên làm nên sự yếu mến của các bạn trẻ với Toco có lẽ chính là hương vị. Trà sữa Toco có hương vị rất đặc trưng, với cái ngọt ngào của sữa, cái thơm thoảng nhẹ nhàng của trà, cái béo ngậy của những viên trân châu hay lát pudding, chưa kể đến hương vị trái cây tự nhiên được pha chế hài hòa. Một đặc điểm nữa khiến Toco rất được yêu thích, đó là ở Toco có một thực đơn vô cùng.. phong phú. Nhờ vào thực đơn đa dạng, phong phú trải dài từ trà sữa đến trà hoa quả, trà đen, trà xanh rồi cả mousse cùng đủ loại topping đã khiến cho các \"tín đồ trà sữa\" phải mê mẩn mỗi khi lạc vào. Hơn nữa, trà sữa Toco có giá không hề đắt. Một ly trà sữa đầy ắp chỉ dao động từ 35 - 42k, đủ để bạn uống no nê và cảm thấy yên tâm.",
                    "brand_name": "TocoToco",
                    "brand_slug": "tocotoco",
                    "id": "55f62d5ff3c0627742796b9f",
                    "image": "https://img.jamja.vn/jamja-prod/gcs_thumb_w_59bcb94076ec5777fc198027-2017-09-16-054019.png?cache=1"
                },
                "check_in_time": 1531452600,
                "code": "JJ64234434",
                "code_status": 7,
                "condition": "*THAM GIA NGAY sự kiện TEAGIVING giữa JAMJA x TOCOTOCO vào ngày 17/6 tới: http://bit.ly/eventteagiving\"\r\n*KHÔNG ÁP DỤNG VỚI DỊCH VỤ GIAO HÀNG*\r\n\r\n- MUA 1 TẶNG 1 toàn menu (chưa bao gồm topping, không áp dụng với menu chè xuesan và sản phẩm Sakura Ngân Nhĩ)\r\n- Sản phẩm tặng có giá thấp hơn hoặc bằng giá tiền sản phẩm mua\r\n- Mỗi mã ưu đãi không giới hạn số cốc sử dụng\r\n\r\nKHUNG GIỜ ÁP DỤNG \r\n- Áp dụng trong khung giờ từ: 9:00 - 22:00\r\n- Áp dụng tất cả các ngày trong tuần\r\n\r\nVui lòng bấm ĐẶT CHỖ để nhận mã giảm giá\r\n\r\nLƯU Ý \r\n- Thông báo mã JAMJA ngay khi đến cửa hàng để được hướng dẫn nhận khuyến mãi \r\n- Áp dụng khi mua tại cửa hàng và đến mua mang về\r\n- Không áp dụng đồng thời với các chương trình khác của TocoToco\r\n- Không áp dụng phụ thu \r\n- Khách hàng được phép đến sớm hoặc muộn hơn 15 phút so với giờ hẹn đến\r\n- Mã giảm giá không có giá trị quy đổi thành tiền mặt\r\n\r\nHOTLINE \r\n- TocoToco: 1900 636936\r\n- JAMJA: 090 222 0326\r\n\r\nMẸO: Bấm \"Theo dõi\" thương hiệu để cập nhật những thay đổi về ưu đãi ngay tức thì.",
                "coupon_id": "5b48185365f76519267e286c",
                "deal_type": "LAST_MINUTE_DEAL",
                "end_sale_time": "2018-07-13T15:00:00",
                "end_valid_time": "2018-07-13T15:00:00",
                "highlight": "MUA 1 TẶNG 1",
                "highlight_title": "MUA 1 TẶNG 1",
                "hint_text": "số cốc",
                "id": "5b189afe76ec5714a790985d",
                "images": [
                    {
                        "fh": 536,
                        "fw": 1024,
                        "id": "5b189abc76ec5714a7909833",
                        "link": "https://img.jamja.vn/jamja-prod/gcs_full_5b189abc76ec5714a7909832-2018-06-07-023852.jpeg?cache=1",
                        "th": 315,
                        "thumbnail": "https://img.jamja.vn/jamja-prod/gcs_thumb_5b189abc76ec5714a7909832-2018-06-07-023854.jpeg?cache=1",
                        "thumbnail_w": "https://img.jamja.vn/jamja-prod/gcs_thumb_w_5b189abc76ec5714a7909832-2018-06-07-023854.jpeg?cache=1",
                        "tw": 600,
                        "twh": 314,
                        "tww": 600
                    }
                ],
                "redeem_destination_url": "",
                "redeem_url": "https://dev.jamja.vn/redeem/JJ64234434/",
                "share_url": "https://dev.jamja.vn/khuyen-mai/tocotoco/tocotoco-43-co-so-mua-1-tang-1-4",
                "slug": "tocotoco-43-co-so-mua-1-tang-1-4",
                "start_sale_time": "2018-06-07T02:26:00",
                "start_valid_time": "2018-06-07T02:26:00",
                "stores": [
                    {
                        "address": "Mipec Long Biên, số 2, phố Long Biên 2 , phường Ngọc Lâm, quận Long Biên, HN",
                        "id": "5799a7e76e0b4923cda21a96",
                        "ipos_store_id": "1474",
                        "latitude": 21.0453916376,
                        "longitude": 105.86626284,
                        "phone_number": "1900636936",
                        "status": 1
                    }
                ],
                "title": "[TocoToco TEAGIVING] - MUA 1 TẶNG 1 tại 43 cơ sở"
            },
            "did": "5b189afe76ec5714a790985d",
            "email": "sinhpn@jamja.vn",
            "id": "5b48185365f76519267e286c",
            "phone_number": "0978987898",
            "promocode": {
                "code_name": "ma1",
                "condition": "<!DOCTYPE html>\n<html>\n<head>\n</head>\n<body>\n<h2><em>Replace Promo Code:</em></h2>\n<h2>B&agrave;i viết n&agrave;y sẽ chia sẻ địa chỉ c&aacute;c qu&aacute;n ch&egrave; ngon m&agrave; ch&uacute;ng m&igrave;nh đ&atilde; gom g&oacute;p được. Hy vọng sẽ l&agrave; th&ocirc;ng tin hữu &iacute;ch cho những bạn c&oacute; y&ecirc;u th&iacute;ch c&aacute;c m&oacute;n ch&egrave; Việt Nam.</h2>\n<p>Ch&egrave; l&agrave; m&oacute;n tr&aacute;ng miệng quen thuộc với tất cả mọi người. Ăn ch&egrave; ng&agrave;y nay đ&atilde; trở th&agrave;nh một c&aacute;i th&uacute;, người ta thưởng thức ch&egrave; ở mọi thời điểm quanh năm, đặc biệt l&agrave; mỗi dịp h&egrave; đến ch&egrave; như một m&oacute;n giải nhiệt được mọi người y&ecirc;u th&iacute;ch. C&ugrave;ng&nbsp;<a href=\"https://jamja.vn/blog/\" target=\"_blank\" rel=\"noopener\">JAMJA&rsquo;s BLOG</a>&nbsp;kh&aacute;m ph&aacute; ngay những qu&aacute;n ch&egrave; nổi tiếng nhất H&agrave; Th&agrave;nh được to&agrave;n d&acirc;n y&ecirc;u th&iacute;ch ngay sau đ&acirc;y.</p>\n</body>\n</html>",
                "description": "free night",
                "end_code_time": "2018-07-27T00:00:00",
                "id": "5b3f318665f765551b2c4a92",
                "start_code_time": "2018-07-06T00:00:00",
                "state": "public",
                "status": "active",
                "type_promocode": "replace"
            },
            "promocode_id": "5b3f318665f765551b2c4a92",
            "redeem_destination_url": "",
            "redeem_url": "https://dev.jamja.vn/redeem/JJ64234434/",
            "result_message": "Vui lòng đọc mã dưới đây cho thu ngân khi thanh toán tại cửa hàng. Xem lại mã tại mục VÍ",
            "result_title": "CHÚC MỪNG BẠN",
            "slot": 10,
            "slot_count": 10,
            "status": 7,
            "store": {
                "address": "Mipec Long Biên, số 2, phố Long Biên 2 , phường Ngọc Lâm, quận Long Biên, HN",
                "id": "5799a7e76e0b4923cda21a96",
                "ipos_store_id": "1474",
                "latitude": 21.0453916376,
                "longitude": 105.86626284,
                "phone_number": "1900636936",
                "status": 1
            },
            "user_name": "Birdy Adam"
        };
        console.log('fake:confirmBooking:data:', data, 'data', fakeData);

        return new Promise(resolve =>
            setTimeout(() => {
                const blob = new Blob([JSON.stringify(fakeData)], {type : 'application/json'});
                const init = { "status" : 200 , "statusText" : "fake confirmBooking api success" };
                const response = new Response(blob,init);

                resolve(response)
            }, 1500)
        )

    },

    checkCouponStatus(couponId) {
        let fakeData = {
            "cancel_time": null,
            "check_in_time": 1531452600,
            "code": "JJ64234434",
            "coupon_highlight": "M1T1",
            "deal": {
                "brand_id": "55f62d5ff3c0627742796b9f",
                "brand_name": "TocoToco",
                "brand_slug": "tocotoco",
                "deal_type": "LAST_MINUTE_DEAL",
                "highlight": "MUA 1 TẶNG 1",
                "hint_text": "số cốc",
                "id": "5b189afe76ec5714a790985d",
                "publish_date": "N/A",
                "save_deal": 0,
                "slug": "tocotoco-43-co-so-mua-1-tang-1-4",
                "thumbnail": "https://img.jamja.vn/jamja-prod/gcs_thumb_5b189abc76ec5714a7909832-2018-06-07-023854.jpeg?cache=1",
                "title": "[TocoToco TEAGIVING] - MUA 1 TẶNG 1 tại 43 cơ sở",
                "user_get_coupon": 0,
                "user_push_comment": 0,
                "user_redeem_coupon": 0,
                "user_view_deal": 0
            },
            "get_time": "2018-07-13T03:11:15.906000",
            "id": "5b48185365f76519267e286c",
            "phone_number": "0978987898",
            "redeem_url": "https://dev.jamja.vn/redeem/JJ64234434/",
            "reject_reason": null,
            "slot_count": 10,
            "status": 1,
            "store": {
                "address": "Mipec Long Biên, số 2, phố Long Biên 2 , phường Ngọc Lâm, quận Long Biên, HN",
                "id": "5799a7e76e0b4923cda21a96"
            },
            "user": {
                "avatar": "https://graph.facebook.com/424532531253644/picture?type=normal",
                "full_name": "Birdy Adam",
                "id": "5b3de27b65f7651561636270",
                "link": "https://facebook.com/424532531253644",
                "username": "Birdy Adam"
            }
        };
        console.log('fake:checkCouponStatus:data:', couponId, 'data', fakeData);

        return new Promise(resolve =>
            setTimeout(() => {
                const blob = new Blob([JSON.stringify(fakeData)], {type : 'application/json'});
                const init = { "status" : 200 , "statusText" : "fake checkCouponStatus api success" };
                const response = new Response(blob,init);

                resolve(response.json())
            }, 1500)
        )
    },

    getUnRateCoupon() {
        const data = [
            {
                "brand": {
                    "brand_desc": "Regiustea tự hào là thương hiệu sở hữu nguồn nguyên liệu cao cấp hạng 1/5 của Đài Loan. Regiustea tự hào đi đầu trên thị trường hiện giờ về kem cheese và kem mặn với màu sắc,độ ngậy và đậm đặc thơm ngon đc nghiên cứu pha chế bằng công thức riêng rất riêng của hãng. Regiustea dùng nước tinh khiết để pha trà cùng kỹ thuật ủ trà lạnh duy nhất chỉ có chúng tôi làm hiện giờ , cùng với rất nhiều loại trà hảo hạng nhập trực tiếp từ hãng , sẽ đem đến hương vị thơm đặc biệt mà các bạn có thể cảm nhận ngay từ lần đầu tiên.",
                    "brand_id": "598826d876ec576ac5e5858c",
                    "brand_name": "Regiustea Vietnam",
                    "follower": 123,
                    "slug": "regiustea-vietnam",
                    "thumb": "https://img.jamja.vn/jamja-prod/gcs_full_598826d876ec576ac5e58588-2017-08-07-083745.png?cache=1"
                },
                "deal": {
                    "brand_name": "Regiustea Vietnam",
                    "brand_slug": "regiustea-vietnam",
                    "highlight": "Giảm 30%",
                    "id": "5b03d8e965f76550963ffa5e",
                    "slug": "regiustea-30-0",
                    "thumbnail": "https://img.jamja.vn/jamja-test/gcs_thumb_5b03d8cc65f76550963ffa5b-2018-05-22-084623.jpeg?cache=1",
                    "title": "Regiustea- 30%. Công ty luôn mong muốn mang tới cho khách hàng những dịch vụ cùng"
                },
                "created": "2018-06-25T13:49:28.851000",
                "id": "583d876876ec570d00d2240a",
                "rate_comment": null,
                "rate_value": null,
                "rated": false
            },
            {
                "brand": {
                    "brand_desc": "Công ty luôn mong muốn mang tới cho khách hàng những dịch vụ cùng",
                    "brand_id": "55f62d5ff3c0627742796b9f",
                    "brand_name": "TocoToco",
                    "follower": 124,
                    "slug": "tocotoco",
                    "thumb": "https://img.jamja.vn/jamja-prod/gcs_full_59bcb94076ec5777fc198027-2017-09-16-054017.png?cache=1"
                },
                "deal": {
                    "brand_name": "TocoToco",
                    "brand_slug": "tocotoco",
                    "highlight": "Nhào dô",
                    "id": "5b039bc765f765192e771bd8",
                    "slug": "free-shot-tat-ca-tren-toan-quoc-0",
                    "thumbnail": "https://img.jamja.vn/jamja-test/gcs_thumb_5b039bba65f765192b771bdc-2018-05-22-042533.jpeg?cache=1",
                    "title": "Free shot tất cả trên toàn quốc: Công ty luôn mong muốn mang tới cho khách hàng những dịch vụ cùng"
                },
                "created": "2018-06-23T10:49:28.851000",
                "id": "583d876876ec570d00d2241a",
                "rate_comment": null,
                "rate_value": null,
                "rated": false
            },
            {
                "brand": {
                    "brand_desc": "\"Đi cà phê\" từ lâu không chỉ đơn thuần",
                    "brand_id": "5608c4b4fda8b959c3784039",
                    "brand_name": "The Coffee House",
                    "follower": 126,
                    "slug": "the-coffee-house",
                    "thumb": "https://img.jamja.vn/jamja-prod/gcs_full_585969fa76ec57535bdb62df-2016-12-20-172723.png?cache=1"
                },
                "deal": {
                    "brand_name": "The Coffee House",
                    "brand_slug": "the-coffee-house",
                    "highlight": "Store selec",
                    "id": "5ad1c2cb65f76553ba1c35c3",
                    "slug": "test-deal-doc-quyen-chon-cua-hang-de-dat-cho-0",
                    "thumbnail": "https://img.jamja.vn/jamja-test/gcs_thumb_5ad1c29d65f76553bb1c35eb-2018-04-14-085809.jpeg?cache=1",
                    "title": "Test Deal Độc quyền chọn cửa hàng để đặt chỗ: Công ty luôn mong muốn mang tới cho khách hàng những dịch vụ cùng"
                },
                "created": "2018-06-23T05:49:28.851000",
                "id": "583d876876ec570d00d2242a",
                "rate_comment": null,
                "rate_value": null,
                "rated": false
            },
            {
                "brand": {
                    "brand_desc": "KFC là cụm từ viết tắt của Kentucky Fried Chicken",
                    "brand_id": "558bb3b714db6b4f005bf4df",
                    "brand_name": "KFC",
                    "follower": 128,
                    "slug": "kfc-0",
                    "thumb": "https://img.jamja.vn/jamja-prod/gcs_full_5767bce66e0b496c23f85b46-2016-06-20-095649.jpg?cache=1"
                },
                "deal": {
                    "brand_name": "KFC",
                    "brand_slug": "kfc-0",
                    "highlight": "Giảm 40%",
                    "id": "5ad031eb65f76533ac9e979c",
                    "slug": "khong-co-gi-noi-bat-ca-0",
                    "thumbnail": "https://img.jamja.vn/jamja-test/gcs_thumb_5ad031e565f76533aa9e979f-2018-04-13-042822.jpeg?cache=1",
                    "title": "khong co gi noi bat ca"
                },
                "created": "2018-05-23T00:49:28.851000",
                "id": "583d876876ec570d00d2244a",
                "rate_comment": null,
                "rate_value": null,
                "rated": false
            }
        ];
        console.log('start:getUnRateCoupon')
        return new Promise(resolve =>
            setTimeout(() => {
                const blob = new Blob([JSON.stringify({objects: data})], {type : 'application/json'});
                const init = { "status" : 200 , "statusText" : "fake getUnRateCoupon api success" };
                const response = new Response(blob,init);

                resolve(response.json())
            }, 1500)
        )
    }
};

exports.fakeApi = fakeApi;