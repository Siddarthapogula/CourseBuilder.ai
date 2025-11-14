"use client";
import { getUserDetails } from "@/actions/user";
import LoadingDisplay from "@/components/LoadingDisplay";

import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Check, Edit, User, X } from "lucide-react";
import { useState, useTransition, useEffect } from "react";
import { updateUser } from "@/actions/user";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Profile() {
  const [userData, setUserData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [backUpData, setBackUpData] = useState(null);
  const [updateProfileData, setUpdateProfileData] = useState<any>({
    id: null,
    name: null,
    image: null,
    about: null,
    organization: null,
  });

  useEffect(() => {
    if (userData) {
      setUpdateProfileData({
        id: userData.id,
        name: userData.name,
        image: userData.image,
        about: userData.about,
        organization: userData.organization,
      });
    }
  }, [userData]);

  const handleUpdateClick = () => {
    setIsEditing(true);
    setBackUpData(userData);
    setUpdateProfileData({
      id: userData.id,
      name: userData.name,
      image: userData.image,
      about: userData.about,
      organization: userData.organization,
    });
  };
  const handleCancelUpdateClick = () => {
    setIsEditing(false);
    setUserData(backUpData);
    setUpdateProfileData({
      id: userData.id,
      name: userData.name,
      image: userData.image,
      about: userData.about,
      organization: userData.organization,
    });
    setBackUpData(null);
  };
  const handleUpdateSubmitClick = async () => {
    startTransition(async () => {
      try {
        const { data } = await updateUser(updateProfileData);
        setUpdateProfileData(data);
        setUserData(data);
      } catch (e: any) {
        alert("error while updating profile" + e.message);
      }
      setIsEditing(false);
    });
  };
  const getUserData = async () => {
    try {
      const { data } = await getUserDetails();
      setUserData(data);
    } catch (e: any) {
      console.log("getting userdetails unsuccessfull", e.message);
      alert("error while fetching user" + e.message);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);
  const userImage = userData?.image || "/default-avatar.png";
  if (!userData) {
    return <LoadingDisplay message="fetching profile" />;
  }
  return (
    <div className=" min-h-screen py-24">
      <Card className=" mx-auto w-full max-w-3xl space-y-2 p-4">
        <CardHeader>
          <CardTitle className=" text-2xl font-medium">Profile</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className=" flex justify-center">
            <div className=" flex  gap-2">
              {updateProfileData?.image ? (
                <Image
                  className=" w-24 h-24 rounded-full border"
                  alt="user"
                  src={updateProfileData?.image}
                  width={96}
                  height={96}
                />
              ) : (
                <User className=" w-24 h-24 rounded-full border" />
              )}
              {isEditing && (
                <Button>
                  {" "}
                  <Edit className=" w-5 h-5" />
                </Button>
              )}
            </div>
          </div>
          <div className=" grid grid-cols-1 md:grid-cols-3 items-center gap-4">
            <Label>Name </Label>
            <Input
              onChange={(e) => {
                setUpdateProfileData((prev: any) => ({
                  ...prev,
                  name: e.target.value,
                }));
              }}
              className=" bg-muted md:col-span-2"
              disabled={!isEditing || isPending}
              value={updateProfileData?.name || ""}
            />
          </div>

          <div className=" grid grid-cols-1 md:grid-cols-3 items-center gap-4">
            <Label>Email </Label>
            <Textarea
              className="resize-none bg-muted md:col-span-2"
              disabled={true}
              placeholder={userData.email}
            />
          </div>

          <div className=" grid grid-cols-1 md:grid-cols-3 items-center gap-4">
            <Label>Organization </Label>
            <Input
              onChange={(e) => {
                setUpdateProfileData((prev: any) => ({
                  ...prev,
                  organization: e.target.value,
                }));
              }}
              className=" bg-muted md:col-span-2"
              disabled={!isEditing || isPending}
              value={updateProfileData?.organization || ""}
            />
          </div>

          <div className=" grid grid-cols-1 md:grid-cols-3 items-start gap-4">
            <Label>About</Label>
            <Textarea
              onChange={(e) => {
                setUpdateProfileData((prev: any) => ({
                  ...prev,
                  about: e.target.value,
                }));
              }}
              className=" bg-muted md:col-span-2"
              disabled={!isEditing || isPending}
              value={updateProfileData?.about || ""}
            />
          </div>
        </CardContent>
        <CardFooter className=" flex justify-end">
          {isEditing ? (
            <div className=" flex gap-2">
              <Button onClick={handleCancelUpdateClick} disabled={isPending}>
                <X className=" w-4 h-4 " />
              </Button>
              <Button onClick={handleUpdateSubmitClick} disabled={isPending}>
                <Check className=" w-4 h-4" />
              </Button>
            </div>
          ) : (
            <Button onClick={handleUpdateClick}>
              <Edit className=" w-4 h-4 mr-2" />
              <span>Update</span>
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
