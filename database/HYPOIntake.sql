CREATE database Intake;

use Intake;

CREATE Table GeneralIntake(
	Team_ID Int Primary Key,
	Team_Name Text,
    Camp_Date Date,
    Num_Personnel Int,
    Country Text,
    Contact_Name Text,
    Contact_Email Text,
    Contact_Phone Text,
    OnSite_Name Text,
    OnSite_Phone Text,
    OnSite_Email Text
);

Create Table CoreCampNeeds(
	Team_ID Int Primary Key,
    Hotel_Accom bool,
    Condo_Accom Int,
    Univ_Cafeteria bool,
    Catering bool,
    charter_transport bool,
    Indiv_shuttle bool,
    Rental bool,
    permit bool,
    Pool50M Int,
    Track400M bool,
    Track300M bool,
    Gym bool,
    OutdoorFieldGrass bool,
    OutdoorFieldTurf bool,
    IndoorFieldTurf bool,
    CourtSpace bool,
    CourtUsage Int,
    AntiGravTread bool
);

CREATE TABLE AdditionalServices(
	Team_ID Int Primary Key,
	Massage_Therapy bool,
    Physio_Therapy bool,
    Strength_Cond bool,
    Ortho_care bool,
    Prim_Med_Care bool,
    Hemo_Test bool,
    Comp_Blood_Prof bool,
    Meta_Panel bool,
    TIBC bool,
    Creatine_Kinase bool,
    other Text,
    VO2_Lactate bool,
    VO2_Thresh bool,
    Lactate_Thresh bool,
    Supp_O2 bool,
    Int_train_diet_analysis bool,
    Nutrition_Group_Pres_WS bool,
    Indiv_Pysch_consult bool,
    Pysch_Group_Pres_WS bool,
    Meeting_Space bool,
    Equip_Stored bool,
    Day_Trip_Excur bool,
    Team_Build_Excer bool,
    otherInfo Text
);

desc GeneralIntake;

desc CoreCampNeeds;

desc AdditionalServices;