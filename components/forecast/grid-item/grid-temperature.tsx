import { classNames } from "@/shared/utils";
import { cva, type VariantProps } from "class-variance-authority";

const temperatureVariants = cva(
    "w-full pb-1 text-center", {
    variants: {
        temperature: {
            "-12": "bg-[#6778AA]",
            "-11": "bg-[#7382B1]",
            "-10": "bg-[#7F8DB8]",
            "-9": "bg-[#8B98BF]",
            "-8": "bg-[#98A4C6]",
            "-7": "bg-[#A2ACCB]",
            "-6": "bg-[#AFB8D3]",
            "-5": "bg-[#BBC2D9]",
            "-4": "bg-[#C6CCDF]",
            "-3": "bg-[#D3D7E6]",
            "-2": "bg-[#DEE2ED]",
            "-1": "bg-[#EAEDF3]",
            "0": "bg-[#F5F6FA]",
            "1": "bg-[#FFF9E8] pt-[1px]",
            "2": "bg-[#FFF5D9] pt-[2px]",
            "3": "bg-[#FFF1CA] pt-[3px]",
            "4": "bg-[#FFEDBA] pt-[4px]",
            "5": "bg-[#FFEAAC] pt-[5px]",
            "6": "bg-[#FFE59B] pt-[6px]",
            "7": "bg-[#FFE28D] pt-[7px]",
            "8": "bg-[#FFDE7D] pt-[8px]",
            "9": "bg-[#FFDA6D] pt-[9px]",
            "10": "bg-[#FFD765] pt-[10px]",
            "11": "bg-[#FFD262] pt-[11px]",
            "12": "bg-[#FFCC5F] pt-[12px]",
            "13": "bg-[#FFC75C] pt-[13px]",
            "14": "bg-[#FFC259] pt-[14px]",
            "15": "bg-[#FFBD56] pt-[15px]",
            "16": "bg-[#FFB853] pt-[16px]",
            "17": "bg-[#FFB350] pt-[17px]",
            "18": "bg-[#FFAD4D] pt-[18px]",
            "19": "bg-[#FFA84A] pt-[19px]",
            "20": "bg-[#FFA447] pt-[20px]",
            "21": "bg-[#FF9E44] pt-[21px]",
            "22": "bg-[#FF9942] pt-[22px]",
            "23": "bg-[#FF943E] pt-[23px]",
            "24": "bg-[#FF8F3B] pt-[24px]",
            "25": "bg-[#FF8A39] pt-[25px]",
            "26": "bg-[#FF8335] pt-[26px]",
            "27": "bg-[#FE7D33] pt-[27px]",
            "28": "bg-[#FA7433] pt-[28px]",
            "29": "bg-[#F86D33] pt-[29px]",
            "30": "bg-[#F36233] pt-[30px]",
            "31": "bg-[#EF5733] pt-[31px]",
            "32": "bg-[#EB4E33] pt-[32px]",
            "33": "bg-[#E74433] pt-[33px]",
            "34": "bg-[#E33A33] pt-[34px]",
            "35": "bg-[#DE2E33] pt-[35px]",
            "36": "bg-[#DA2433] pt-[36px]",
            "37": "bg-[#D61933] pt-[37px]",
            "38": "bg-[#D10D33] pt-[38px]",
            "39": "bg-[#CD0333] pt-[39px]",
            "40": "bg-[#C30031] pt-[40px]",
            "41": "bg-[#B6002E] pt-[41px]",
            "42": "bg-[#A40029] pt-[42px]",
            "43": "bg-[#910024] pt-[43px]",
            "44": "bg-[#820021] pt-[44px]",
            "45": "bg-[#6F001C] pt-[45px]",
            "46": "bg-[#5B0017] pt-[46px]",
            "47": "bg-[#4E0014] pt-[47px]",
            "48": "bg-[#3A000E] pt-[48px]",
            "49": "bg-[#2B000B] pt-[49px]",
            "50": "bg-max-temp  pt-[50px] text-white"
        }
    }
});

interface GridTemperatureProps {
    temperature: number;
}

export default function GridTemperature({ temperature }: GridTemperatureProps) {
    return (
        <div className={"w-full h-12 max-h-12 overflow-hidden flex flex-shrink-0 items-end justify-end mt-1"}>
            <div className={classNames(temperatureVariants({ temperature: String(Math.min(Math.max(temperature, -12), 50)) as VariantProps<typeof temperatureVariants>["temperature"] }))}>{temperature}°</div>
        </div>
    )
}