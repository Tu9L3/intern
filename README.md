## Description

Case 1: Trước giờ chưa điểm danh

- Case 1.1: Hôm nay là cuối tháng => Nhận thưởng tháng này => Checkin
- Case 1.2: Ngày trong tháng => Checkin

Case 2: Đã từng điểm danh

- Case 2.1: Hôm nay đã điểm danh => Tăng accessMount
- Case 2.2: Hôm nay chưa điểm danh
  - Case 2.2.1: Hôm nay là cuối tháng
    - Case 2.2.1.1: Tháng trước đó chưa nhận thưởng => Nhận thưởng tháng trước đó => Nhận thưởng tháng này => Checkin
    - Case 2.2.1.2: Tháng trước đó đã nhận thưởng => Nhận thưởng tháng này => Checkin
  - Case 2.2.2: Hôm nay là ngày trong tháng
    - Case 2.2.2.1: Tháng trước đó chưa nhận thưởng => Nhận thưởng tháng trước đó => Checkin
    - Case 2.2.2.2: Tháng trước đó đã nhận thưởng => Checkin
