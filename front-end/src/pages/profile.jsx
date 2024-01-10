import Footer from "../components/footer";
import Header from "../components/header";
import Navbar from "../components/navbar";
import {
  Breadcrumb,
  Button,
  message,
} from "antd";
import { useProfile } from "../hooks/user/use-profile";
import UpdateProfileModal from "../components/profile/update-profile-modal";
import { useState } from "react";
import { useUpdateProfile } from "../hooks/user/use-update-profile";
import { useQueryClient } from "@tanstack/react-query";
import UpdatePasswordModal from "../components/profile/update-password-modal";
import { useUpdatePassword } from "../hooks/user/use-update-password";
import Loading from "../components/loading";

function formatDate(dateString) {
  if (!dateString) return "";
  const originalDate = new Date(
    dateString
  );

  const day = originalDate.getUTCDate();
  const month =
    originalDate.getUTCMonth() + 1; // Months are zero-based
  const year =
    originalDate.getUTCFullYear();

  // Padding single-digit day/month with leading zero if necessary
  const formattedDay =
    day < 10 ? `0${day}` : day;
  const formattedMonth =
    month < 10 ? `0${month}` : month;

  const formattedDateString = `${formattedDay}/${formattedMonth}/${year}`;
  return formattedDateString;
}

const Profile = () => {
  const queryClient = useQueryClient();
  const [messageApi, contextHolder] =
    message.useMessage();
  const [isModalOpen, setIsModalOpen] =
    useState(false);
  const [
    isPasswordOpen,
    setIsPasswordOpen,
  ] = useState(false);

  const { data, isLoading } =
    useProfile();
  const { mutate: update } =
    useUpdateProfile();
  const { mutate: mutatePassword } =
    useUpdatePassword();

  const updateProfile = (values) => {
    update(values, {
      onSuccess(response) {
        localStorage.setItem(
          "skinFoodShopUser",
          JSON.stringify(response.data)
        );
        queryClient.invalidateQueries({
          queryKey: ["profile"],
        });
        messageApi.success(
          "Chỉnh sửa thông tin thành công"
        );
      },
      onError(error) {
        const message =
          error.response.data.message;
        messageApi.error(message);
      },
      onSettled() {
        setIsModalOpen(false);
      },
    });
  };

  const updatePassword = (values) => {
    mutatePassword(values, {
      onSuccess() {
        setIsPasswordOpen(false);
        messageApi.success(
          "Chỉnh sửa thành công"
        );
      },
      onError(error) {
        messageApi.error(
          error.response.data.message
        );
      },
    });
  };

  if (isLoading) return <Loading />;

  return (
    <div>
      {contextHolder}
      <Header />
      <Navbar />
      <div className="container mx-auto">
        <div className="p-2 rounded bg-[#F9FBF6] mb-6 lg:px-[4rem] xl:px-0">
          <Breadcrumb
            items={[
              {
                title: "Trang chủ ",
              },
              {
                title: (
                  <a href="">
                    Tài khoản của tôi{" "}
                  </a>
                ),
              },
            ]}
          />
        </div>
        <div className="max-w-[90%] lg:max-w-[70%] mx-auto mb-10">
          <p className="font-bold text-5xl mb-10">
            Thông tin tài khoản{" "}
          </p>
          <div className="flex items-center justify-between mb-4">
            <span className="text-base text-gray-400">
              Họ và tên
            </span>
            <span className="text-base font-bold">
              {data?.data?.name ??
                "Người dùng"}
            </span>
          </div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-base text-gray-400">
              Số điện thoại{" "}
            </span>
            <span className="text-base font-bold">
              {data?.data.phone}
            </span>
          </div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-base text-gray-400">
              Giới tính{" "}
            </span>
            <span className="text-base font-bold">
              {data?.data.gender}{" "}
            </span>
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className="text-base text-gray-400">
              <div>
                Ngày sinh
                (ngày/tháng/năm)
              </div>
              <div className="text-sm max-w-[240px] lg:max-w-none">
                Hãy cập nhật ngày sinh
                để Ori gửi cho bạn 1
                phần quà đặc biệt nhé
              </div>
            </div>
            <span className="text-base font-bold">
              {formatDate(
                data?.data.birthday
              )}
            </span>
          </div>
          <Button
            onClick={() =>
              setIsModalOpen(true)
            }
          >
            Cập nhật{" "}
          </Button>
        </div>
        <div className="max-w-[90%] lg:max-w-[70%] mx-auto mb-10">
          <p className="font-bold text-5xl mb-10">
            Thông tin đăng nhập{" "}
          </p>
          <div className="flex items-center justify-between mb-4">
            <span className="text-base text-gray-400">
              Email
            </span>
            <span className="text-base font-bold">
              {data?.data.email ??
                "Chưa cập nhật"}
            </span>
          </div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-base text-gray-400">
              Mật khẩu{" "}
            </span>
            <span className="text-base font-bold">
              ........
            </span>
          </div>

          <Button
            onClick={() =>
              setIsPasswordOpen(true)
            }
          >
            Cập nhật{" "}
          </Button>
        </div>
      </div>
      <Footer />
      <UpdateProfileModal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        onSubmit={updateProfile}
        profile={data.data}
      />
      <UpdatePasswordModal
        open={isPasswordOpen}
        setOpen={setIsPasswordOpen}
        onSubmit={updatePassword}
      />
    </div>
  );
};

export default Profile;
